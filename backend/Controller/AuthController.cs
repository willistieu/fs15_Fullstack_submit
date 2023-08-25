using backend.Authentication;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    public static class AuthController
    {
        public static void Map(WebApplication app, WebApplicationBuilder builder )
        {
            app.MapPost("/login", ( [FromBody] UserLogin user, FsDB db ) => 
                        UserAuthentication.Login(user, db, builder));
            app.MapPost("/topadmin/login", ( [FromBody] UserLogin user ) => 
                        UserAuthentication.TopAdminLogin(user, builder));
        }
    }
}
