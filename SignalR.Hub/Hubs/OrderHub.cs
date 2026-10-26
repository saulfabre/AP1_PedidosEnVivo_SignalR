using Microsoft.AspNetCore.SignalR;
using SignalR.Shared.Contracts;

namespace SignalR.Hub.Hubs;

public sealed class OrderHub : Microsoft.AspNetCore.SignalR.Hub
{
    public async Task SendState(string user, string state)
    {
        if (string.IsNullOrWhiteSpace(user) || string.IsNullOrWhiteSpace(state))
        {
            throw new HubException("El usuario y el estado son obligatorios.");
        }   

        user = user.Trim();
        state = state.Trim();

        if (user.Length > 40 || state.Length > 14)
        {
            throw new HubException("El estado supera el límite permitido.");
        }

        var orderNotification = new OrderNotification(
            user,
            state,
            DateTimeOffset.UtcNow
        );

        await Clients.All.SendAsync(
            "ReceiveOrder",
            orderNotification
        );
    }
}
