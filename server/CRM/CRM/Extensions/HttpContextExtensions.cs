using System;
namespace CRM.Extensions
{
	public static class HttpContextExtensions
	{
        public static Guid GetUserId(this HttpContext httpContext) {
            return httpContext.Items["Id"] as Guid? ??
                throw new Exception("User ID not found in HttpContext.Items");
        }


    }
}

