using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller
{
    public static class CheckoutController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/checkout",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            ( FsDB db) =>
            {
                try
                {
                    List<Checkout> _checkout = CheckoutRepository.CheckoutList(db);
                    if (_checkout is null) Results.NotFound();
                    return Results.Ok(_checkout);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapGet("/checkout/{id}",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            ( int id, FsDB db) =>
            {

                try
                {
                    Checkout? _checkout = CheckoutRepository.GetCheckoutById(id, db);
                    if (_checkout is null) return Results.NotFound();
                    return Results.Ok(_checkout);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapPost("/checkout",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (Checkout checkout, FsDB db) =>
            {

                try
                {
                    //CheckoutRepository.PostCheckOut(checkout, db);
                    db.checkouts.Add(checkout);
                    await db.SaveChangesAsync();
                    return Results.Created($"/checkout/{checkout.Id}", checkout);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapDelete("/checkout/{id}",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            async (int id, FsDB db) =>
            {
                if (await db.checkouts.FindAsync(id) is Checkout checkout)
                {
                    db.checkouts.Remove(checkout); 
                    await db.SaveChangesAsync();
                    //CheckoutRepository.DeleteCheckout(id, db);
                    return Results.NoContent();
                }
                return Results.NotFound();
            });
        }
    }
}
