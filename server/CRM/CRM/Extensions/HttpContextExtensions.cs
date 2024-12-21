using System;
namespace CRM.Extensions
{
	public static class HttpContextExtensions
	{
        public static Guid GetUserId(this HttpContext httpContext)
        {
            return httpContext.Items["UserId"] as Guid? ??
                throw new Exception("User ID not found in HttpContext.Items");
        }
        public static Guid GetPhongBanId(this HttpContext httpContext)
        {
            return httpContext.Items["PhongBan"] as Guid? ??
                throw new Exception("User ID not found in HttpContext.Items");
        }


    }
}

