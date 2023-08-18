using backend.Data;
using backend.Models;
using backend.Repositories;

namespace backend.Controller
{
    public static class CartController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/carts", (FsDB db) => {
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
            app.MapGet("/carts/{id}", (int id, FsDB db) => {
                try
                {
                    Cart? _cart = CartRepository.GetCart(id, db);
                    if (_cart is null) return Results.NotFound();
                    return Results.Ok(_cart);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception($"An error is exist");
                }
            });
            app.MapPost("/carts",async (Cart cart, FsDB db) => {
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
                    throw new Exception($"An error is exist");
                }
            });
            app.MapDelete("/carts/{id}", async (int id, FsDB db) => {
                if (await db.carts.FindAsync(id) is Cart cart)
                {
                    CartRepository.DeleteCart(id, db);
                    return Results.NoContent();
                }
                return Results.NotFound();

            });
        }
    }
}
