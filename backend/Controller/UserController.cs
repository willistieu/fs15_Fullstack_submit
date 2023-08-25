
using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controller
{
    public static class UserController
    {
        public static void Map ( WebApplication app )
        {
            app.MapGet("/users",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            ( FsDB db ) =>
            {
                try
                {
                    HttpRequestMessage re = new HttpRequestMessage();

                    var auth = re.Headers.Authorization;
                    Console.WriteLine(auth);

                    List<User> _users = UserRepository.UserList(db);
                    if (_users is null) Results.NotFound();
                    return Results.Ok(_users);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapGet("/users/{id}",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin, topadmin")]
            ( int id, FsDB db ) =>
            {
                try
                {
                    User? _user = UserRepository.GetUserById(id, db);
                    if (_user is null) return Results.NotFound();
                    return Results.Ok(_user);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });

            app.MapPost("/users/customer",
            async ( User user, FsDB db ) =>
            {
                try
                {
                    if (user is null) return Results.NoContent();

                    User _user = user;
                    _user.Role = "customer";

                    db.users.Add(_user);
                    await db.SaveChangesAsync();
                    return Results.Created($"/users/{user.Id}", user);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapPost("/users/admin",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin")]
            async ( User user, FsDB db ) =>
            {
                try
                {
                    if (user is null) return Results.NoContent();

                    User _user = user;
                    _user.Role = "admin";

                    db.users.Add(_user);
                    await db.SaveChangesAsync();
                    return Results.Created($"/users/{user.Id}", user);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });

            app.MapDelete("/users/{id}",
             [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin")]
            async ( int id, FsDB db ) =>
            {
                if (await db.users.FindAsync(id) is User user)
                {
                    db.users.Remove(user);
                    await db.SaveChangesAsync();
                    //UserRepository.DeleteUser(id, db);
                    return Results.NoContent();
                }
                return Results.NotFound();
            });
            app.MapPut("/users/{id}",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin, topadmin")]
            async ( int id, User inputUser, FsDB db ) =>
            {
                var user = await db.users.FindAsync(id);
                if (user is null) return Results.NotFound();

                user.Name = inputUser.Name;
                user.Username = inputUser.Username;
                user.Password = inputUser.Password;
                user.Email = inputUser.Email;

                await db.SaveChangesAsync();
                return Results.Created($"/users/{user.Id}", user);
            });

        }
    }
}
