"use strict";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7001/orderHub")
  .withAutomaticReconnect()
  .build();

const sendButton = document.getElementById("sendButton");
const status = document.getElementById("status");
const ordersList = document.getElementById("ordersList");

connection.on("ReceiveOrder", (order) => {
  const item = document.createElement("li");
  item.className =
    "list-group-item d-flex justify-content-between align-items-center";

  const user = document.createElement("span");
  user.textContent = order.user;

  const badge = document.createElement("span");
  badge.className = "badge rounded-pill";

  switch (order.state) {
    case "Pendiente":
      badge.className = "badge rounded-pill bg-warning text-dark";
      break;
    case "En Preparación":
      badge.className = "badge rounded-pill bg-info text-dark";
      break;
    case "Enviado":
      badge.className = "badge rounded-pill bg-primary text-white";
      break;
    case "Entregado":
      badge.className = "badge rounded-pill bg-success text-white";
      break;
  }

  badge.textContent = order.state;

  item.append(user, badge);
  ordersList.appendChild(item);
});

connection.onreconnecting(() => {
  status.textContent = "Reconectando...";
  sendButton.disabled = true;
});

connection.onreconnected(() => {
  status.textContent = "Conectado";
  sendButton.disabled = false;
});

async function startConnection() {
  try {
    await connection.start();
    status.textContent = "Conectado";
    sendButton.disabled = false;
  } catch (error) {
    status.textContent = "Error de conexión";
    console.error(error);
  }
}

sendButton.addEventListener("click", async () => {
const user = document
.getElementById("userInput").value.trim();
const state = document
.getElementById("stateInput").value.trim();

if (!user || !state) {
  alert("Completa el usuario y el estado del pedido.");
  return;
}

if (connection.state !== signalR.HubConnectionState.Connected) {
  alert("No existe una conexión activa.");
  return;
}

try {
  await connection.invoke("SendState", user, state);
  document.getElementById("stateInput").value = "";
} catch (error) {
  console.error("No se pudo enviar el estado:", error);
}
});

startConnection();
