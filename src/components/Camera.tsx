import { useEffect, useRef, useState } from "react";
import { createFaceLandmarker } from "../services/faceLandMarker";
import { getBlendshapeScore } from "../utils/getBleandShapeScore";
import { classifyExpression } from "../utils/classifyExpression";
import type { Expression } from "../types/Expression";
import { MemeResult } from "./MemeResult";
import { Memes } from "../Data/Memes";

export function Camera() {
  const [cameraActive, setCameraActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const lastFaceDetection = useRef<number>(0);
  const [result, setResult] = useState<Expression | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const expressionRef = useRef<Expression>("neutral");

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (!videoRef.current) {
        return;
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setCameraActive(true);

      startFaceDetection();
    } catch (error) {
      console.error("Erro ao acessar a câmera: ", error);
    }
  }

  function resetResult() {
    setResult(null);
  }

  function analyzeExpression() {
    const timeSinceLastFace = Date.now() - lastFaceDetection.current;

    if (timeSinceLastFace > 500) {
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      setResult(expressionRef.current);
      setAnalyzing(false);
    }, 1200);
  }
  async function startFaceDetection() {
    const faceLandmarker = await createFaceLandmarker();
    const detect = () => {
      const video = videoRef.current;

      if (!video) return;

      if (video.readyState >= 2) {
        const result = faceLandmarker.detectForVideo(video, performance.now());

        const hasFace = result.faceLandmarks.length > 0;
        setFaceDetected(hasFace);

        if (hasFace) {
          lastFaceDetection.current = Date.now();

          const blendshapes = result.faceBlendshapes[0];
          const smileLeft = getBlendshapeScore(
            blendshapes.categories,
            "mouthSmileLeft",
          );

          const smileRight = getBlendshapeScore(
            blendshapes.categories,
            "mouthSmileRight",
          );

          const jawOpen = getBlendshapeScore(blendshapes.categories, "jawOpen");

          const eyeWideLeft = getBlendshapeScore(
            blendshapes.categories,
            "eyeWideLeft",
          );

          const eyeWideRight = getBlendshapeScore(
            blendshapes.categories,
            "eyeWideRight",
          );

          const browUp = getBlendshapeScore(
            blendshapes.categories,
            "browInnerUp",
          );

          const eyeBlinkLeft = getBlendshapeScore(
            blendshapes.categories,
            "eyeBlinkLeft",
          );

          const eyeBlinkRight = getBlendshapeScore(
            blendshapes.categories,
            "eyeBlinkRight",
          );
          const smile = (smileLeft + smileRight) / 2;
          const eyeWide = (eyeWideLeft + eyeWideRight) / 2;
          const eyeBlink = (eyeBlinkLeft + eyeBlinkRight) / 2;

          const detectedExpression = classifyExpression({
            smile,
            jawOpen,
            eyeWide,
            browUp,
            eyeBlink,
          });
          expressionRef.current = detectedExpression;

          console.table({
            smile,
            jawOpen,
            eyeWide,
            browUp,
            eyeBlink,
          });
        }

        animationFrameRef.current = requestAnimationFrame(detect);
      }
    };
    detect();
  }

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const stream = videoRef.current?.srcObject as MediaStream | null;

      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <section className="camera-section">
      {!result && (
        <>
          <div className="camera-wrapper">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-video"
            />

            {cameraActive && (
              <div className={`face-status ${faceDetected ? "detected" : ""}`}>
                {faceDetected ? "✓ Rosto detectado" : "Procurando rosto..."}
              </div>
            )}
          </div>

          {!cameraActive && (
            <button className="primary-button" onClick={startCamera}>
              Ativar câmera
            </button>
          )}

          {cameraActive && faceDetected && !analyzing && (
            <button className="primary-button" onClick={analyzeExpression}>
              🐾 Descobrir meu gato
            </button>
          )}

          {analyzing && (
            <div className="analyzing">
              <span className="cat-loader">🐱</span>

              <p>Analisando sua energia felina...</p>
            </div>
          )}
        </>
      )}

      {result && <MemeResult meme={Memes[result]} onRetry={resetResult} />}
    </section>
  );
}
