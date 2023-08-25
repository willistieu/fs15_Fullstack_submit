using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controller
{
    public static class CartController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/carts",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            ( FsDB db) =>
            {
                try
                {
                    List<Cart> _cart = CartRepository.CartList(db);
                    if (_cart is null) Results.NotFound();
                    return Results.Ok(_cart);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapGet("/carts/{id}",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            ( int id, FsDB db) =>
            {
                try
                {
                    Cart? _cart = CartRepository.GetCart(id, db);
                    if (_cart is null) return Results.NotFound();
                    return Results.Ok(_cart);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapPost("/carts",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (Cart cart, FsDB db) =>
            {
                try
                {
                    //CartRepository.PostAcart(cart, db);

                    db.carts.Add(cart);
                    await db.SaveChangesAsync();
                    return Results.Created($"/carts/{cart.Id}", cart);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception("An error is exist");
                }
            });
            app.MapDelete("/carts/{id}",
                [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "topadmin, admin")]
            async (int id, FsDB db) =>
            {
                if (await db.carts.FindAsync(id) is Cart cart)
                {
                    db.carts.Remove(cart);
                    await db.SaveChangesAsync();
                    //CartRepository.DeleteCart(id, db);
                    return Results.NoContent();
                }
                return Results.NotFound();

            });
        }
    }
}
