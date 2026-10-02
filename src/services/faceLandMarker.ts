import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let faceLandMarker: FaceLandmarker | null = null;

export async function createFaceLandmarker() {
  if (faceLandMarker) return faceLandMarker;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  faceLandMarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true,
  });
  return faceLandMarker;
}
