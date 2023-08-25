using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Authentication
{
    public class UserAuthentication
    {
        public string GetTokenNameIdentifier ( string token )
        {
            var _token = new JwtSecurityToken(jwtEncodedString: token);
            string name = _token.Claims.First(c => c.Type == "NameIdentifier").Value;
            return name;
        }
        public static IResult Login ( UserLogin user, FsDB db, WebApplicationBuilder builder )
        {
            if (!string.IsNullOrEmpty(user.Username) &&
                !string.IsNullOrEmpty(user.Password))
            {
                var loggedInUser = UserRepository.GetUserByUsername(user.Username, user.Password, db);
                if (loggedInUser is null) return Results.NotFound("User not found");

                //var claims = new[]
                //{
                //    new Claim(ClaimTypes.NameIdentifier, loggedInUser.Username),
                //    new Claim(ClaimTypes.Email, loggedInUser.Email),
                //    new Claim(ClaimTypes.Name, loggedInUser.Name),
                //    new Claim(ClaimTypes.Role, loggedInUser.Role)
                //};
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, loggedInUser.Username),
                    new Claim(ClaimTypes.Email, loggedInUser.Email),
                    new Claim(ClaimTypes.Name, loggedInUser.Name),
                    new Claim(ClaimTypes.Role, loggedInUser.Role)
                };

                var token = new JwtSecurityToken
                (
                    issuer: builder.Configuration["Jwt:Issuer"],
                    audience: builder.Configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(4),
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                        SecurityAlgorithms.HmacSha256)
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                return Results.Ok(tokenString);
            }
            return Results.BadRequest("Invalid user credentials");
        }

        public static IResult TopAdminLogin ( UserLogin user, WebApplicationBuilder builder )
        {

            try
            {
                if (!string.IsNullOrEmpty(user.Username) &&
                !string.IsNullOrEmpty(user.Password))
                {
                    Boolean _topAdminVerify = TopAdminVerify(user, builder);
                    if (_topAdminVerify == false)
                    {
                        return Results.BadRequest("Invalid user credentials");
                    }
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, "topadmin"),
                        new Claim(ClaimTypes.Role, "topadmin")
                    };

                    var token = new JwtSecurityToken
                    (
                    issuer: builder.Configuration["Jwt:Issuer"],
                    audience: builder.Configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddHours(4),
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                        SecurityAlgorithms.HmacSha256)
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Results.Ok(tokenString);

                }
                return Results.BadRequest("Invalid user credentials");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }

        static Boolean TopAdminVerify ( UserLogin user, WebApplicationBuilder builder )
        {
            try
            {
                if (!string.IsNullOrEmpty(user.Username) &&
                !string.IsNullOrEmpty(user.Password))
                {
                    return user.Username.Equals(builder.Configuration["TopAdmin:Username"]) && user.Password.Equals(builder.Configuration["TopAdmin:Password"]) ? true : false;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
    }
}
