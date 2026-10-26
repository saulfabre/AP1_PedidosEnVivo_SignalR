# Pedidos en vivo con SignalR

## Requisitos
- Tener instalado .NET 10.0.
- Tener Visual Studio o Visual Studio Code.
- Descargar los paquetes y dependencias necesarios en tu proyecto [De ser necesario].

## Pasos de ejecución

1. Clonar o descargar el repositorio.
2. Abrir el proyecto en tu entorno de desarrollo.
3. Verificar el Endpoint del Hub y los puertos configurados para el servidor y el cliente.
4. Ejecutar el proyecto servidor, desde tu terminal.
5. Ejecutar el proyecto cliente en otra terminal.
6. Abrir la aplicación en el navegador.
7. Escribir el nombre del usuario, seleccionar el estado del pedido y pulsar **Enviar**.
8. Comprobar que el pedido aparece en la lista y que los clientes reciben la notificación en tiempo real.

## Funcionamiento
La aplicación utiliza SignalR para enviar y recibir notificaciones de pedidos en tiempo real. Los estados se muestran con badges de distintos colores mediante Bootstrap.