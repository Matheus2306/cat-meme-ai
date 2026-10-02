import type { Expression } from "../types/Expression";

type ExpressionValues = {
  smile: number;
  jawOpen: number;
  eyeWide: number;
  browUp: number;
  eyeBlink: number;
};

export function classifyExpression({
  smile,
  eyeWide,
  jawOpen,
  browUp,
  eyeBlink,
}: ExpressionValues): Expression {
  if (smile > 0.6) {
    return "happy";
  }

  if (jawOpen > 0.5 && eyeWide > 0.35) {
    return "shocked";
  }

  if (browUp > 0.45) {
    return "suspicious";
  }

  if (eyeBlink < 0.25) {
    return "sleepy";
  }

  return "neutral";
}
