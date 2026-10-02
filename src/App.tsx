import "./App.css";
import { Camera } from "./components/Camera";

function App() {
  return (
    <main className="app">
      <section className="hero">
        <span className="badge">CAT VISION AI</span>

        <h1>
          Qual meme de gato
          <span> você é?</span>
        </h1>

        <p>
          Faça uma expressão para a câmera e descubra qual gato representa seu
          estado de espírito.
        </p>
      </section>

      <Camera />

      <footer>React • TypeScript • MediaPipe</footer>
    </main>
  );
}

export default App;
