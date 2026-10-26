namespace SignalR.Shared.Contracts;

public sealed record OrderNotification(
    string User,
    string State,
    DateTimeOffset SentAt
);
