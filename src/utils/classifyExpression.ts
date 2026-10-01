export function classifyExpression(values: {
  smile: number;
  eyeWide: number;
  jawOpen: number;
  browUp: number;
}) {
  const { smile, eyeWide, jawOpen, browUp } = values;
  
  if (smile > 0.6) {
    return "happy";
  }

  if (jawOpen > 0.55 && eyeWide > 0.4) {
    return "shocked";
  }

  if (browUp > 0.5) {
    return "suspicious";
  }

  if (eyeWide < 0.15) {
    return "sleepy";
  }

  return "neutral";
}
