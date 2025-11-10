import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// Evento que se ejecuta al recibir respuesta del servidor
socket.on("respuesta", (data) => {
  console.log("Respuesta del servidor:", data);
});

// Función para enviar mensajes
export const enviarMensaje = (texto) => {
  socket.emit("mensaje", { texto });
};

// Exportar el socket si quieres usar eventos directamente
export default socket;

