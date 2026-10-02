import type { Meme } from "../types/Meme";


export const Memes: Record<string, Meme> = {
  happy: {
    id: "happy",
    title: "Gato Feliz",
    description: "Hoje absolutamente nada consegue destruir seu humor.",
    image: "/memes/happy.jpeg",
  },

  shocked: {
    id: "shocked",
    title: "Gato em Choque",
    description: "Você acabou de descobrir algo que não deveria.",
    image: "/memes/shocked.jpeg",
  },

  suspicious: {
    id: "suspicious",
    title: "Gato Desconfiado",
    description: "Tem alguma coisa errada aqui...",
    image: "/memes/suspicious.jpeg",
  },

  sleepy: {
    id: "sleepy",
    title: "Gato Cansado",
    description: "Você claramente precisa de férias.",
    image: "/memes/sleepy.jpeg",
  },

  neutral: {
    id: "neutral",
    title: "Gato Existencial",
    description: "Apenas observando o caos acontecer.",
    image: "/memes/neutral.jpeg",
  },
};