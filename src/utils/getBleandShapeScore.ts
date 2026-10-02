import type { Category } from "@mediapipe/tasks-vision";

export function getBlendshapeScore(categories: Category[], name: string) {
  return (
    categories.find((category) => category.categoryName === name)?.score ?? 0
  );
}
