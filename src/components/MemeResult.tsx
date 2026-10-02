import type { Meme } from "../types/Meme";


type Props = {
  meme: Meme;
  onRetry: () => void;
};

export function MemeResult({
  meme,
  onRetry,
}: Props) {
  return (
    <div className="result-card">
      <span className="result-label">
        VOCÊ É...
      </span>

      <img
        src={meme.image}
        alt={meme.title}
        className="result-image"
      />

      <h2>{meme.title}</h2>

      <p>{meme.description}</p>

      <button
        className="primary-button"
        onClick={onRetry}
      >
        Tentar novamente
      </button>
    </div>
  );
}