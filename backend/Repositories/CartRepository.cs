using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public static class CartRepository
    {
        public static List<Cart> CartList(FsDB db)
        {
            var _cart = db.carts;
            return _cart.ToList();
        }
        public static Cart? GetCart(int id, FsDB db) {
            try
            {
                Cart? _cart = db.carts.FirstOrDefault(c => c.Id == id);
                return _cart;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
        public static void PostAcart(Cart cart, FsDB db) {
            try
            {
                if (cart.Id <= 0)
                {
                    db.carts.AddAsync(cart);
                    db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
        public static void DeleteCart(int id, FsDB db) {
            try
            {
                Cart? _cart = db.carts.FirstOrDefault(c => c.Id == id);
                if (_cart is not null)
                {
                    db.carts.Remove(_cart);
                    db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
    }
}
