using Microsoft.AspNetCore.SignalR;

namespace CRM.Helper
{
    public class CustomUserIdProvider : IUserIdProvider
    {
        public string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst("UserId")?.Value;
        }
    }
}
