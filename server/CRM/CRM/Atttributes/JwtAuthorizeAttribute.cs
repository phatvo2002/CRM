using System;
using Microsoft.AspNetCore.Mvc;
using CRM.Filters;

namespace CRM.Attributes
{
    public class JwtAuthorizeAttribute : TypeFilterAttribute
    {

        public JwtAuthorizeAttribute()
            : base(typeof(JwtAuthorizeFilter))
        {

        }
    }
}

