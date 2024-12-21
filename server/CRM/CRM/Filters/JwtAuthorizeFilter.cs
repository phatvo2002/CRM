using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace CRM.Filters
{
    public class JwtAuthorizeFilter : IAuthorizationFilter
    {
        private readonly IConfiguration _config;
        public JwtAuthorizeFilter(IConfiguration config)
        {
            _config = config;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
          
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            
            if (token == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettingsProvider.Get("JWT:IssuerSigningKey") ?? "");
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);
                var jwtToken = (JwtSecurityToken)validatedToken;
                if (jwtToken.ValidTo < DateTime.UtcNow)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                var user = jwtToken.Claims;
                var userId = new Guid(jwtToken.Claims.First(x => x.Type == "UserId").Value);
                context.HttpContext.Items["UserId"] = userId;
                var phongban = new Guid(jwtToken.Claims.First(x => x.Type == "PhongBan").Value);
                context.HttpContext.Items["PhongBan"] = phongban;
                var groupId = new Guid(jwtToken.Claims.First(x => x.Type == "MaChucVu").Value);
                context.HttpContext.Items["MaChucVu"] = groupId;
                var userName = jwtToken.Claims.First(x => x.Type == "TaiKhoan").Value;
                context.HttpContext.Items["TaiKhoan"] = userName;
            }
            catch (Exception ex) { 
            
                var result = ex.Message;
                //context.Result = new UnauthorizedResult();
            }
        }
    }
}

