using backend.Data;
using backend.Models;
using backend.Repositories;


namespace backend.Controller
{
    public static class UserController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/users", (FsDB db) =>
            {
                try
                {
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
            app.MapGet("/users/{id}", (int id, FsDB db) =>
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
            app.MapPost("/users", async (User user, FsDB db) =>
            {
                try
                {
                    //UserRepository.PostAUser(user, db);
                    db.users.Add(user);
                    await db.SaveChangesAsync();
                    return Results.Created($"/users/{user.Id}", user);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapDelete("/users/{id}", async (int id, FsDB db) =>
            {
                if (await db.users.FindAsync(id) is User user)
                {
                    UserRepository.DeleteUser(id, db);
                    return Results.NoContent();
                }
                return Results.NotFound();
            });
            app.MapPut("/users/{id}", async (int id, User inputUser, FsDB db) =>
            {
                var _user = await db.users.FindAsync(id);

                if (_user is null) return Results.NotFound();

                var editedUser = UserRepository.PutAuser(id, inputUser, db);
                return Results.Ok(editedUser);
            });

        }
    }
}
