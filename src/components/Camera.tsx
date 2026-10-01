import { useRef, useState } from "react";

export function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [cameraActive, setCameraActive] = useState(false);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera: ", error);
    }
  }
  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width={"640"} height={"480"} />
      {!cameraActive && <button onClick={startCamera}>ativar câmera</button>}
    </div>
  );
}
