using Microsoft.AspNetCore.SignalR;

namespace CRM.Helper
{
    public class NotificationHub : Hub
    {
        public async Task SendNotification(string userId, string message)
        {
            await Clients.User(userId).SendAsync("ReceiveNotification", message);

        }

        public override Task OnConnectedAsync()
        {
            Console.WriteLine("Kết nối từ userId: " + Context.UserIdentifier);
            return base.OnConnectedAsync();
        }
    }
}
