using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public static class CheckoutRepository
    {
        public static List<Checkout> CheckoutList(FsDB db)
        {
            var _checkout = db.checkouts;
            return _checkout.ToList();
        }

        public static Checkout? GetCheckoutById(int id, FsDB db)
        {
            try
            {
                Checkout? _checkout = db.checkouts.FirstOrDefault(c => c.Id == id);
                return _checkout;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
        public static void PostCheckOut(Checkout checkout, FsDB db)
        {
            try
            {
                if (checkout.Id <= 0)
                {
                    db.checkouts.AddAsync(checkout);
                    db.SaveChangesAsync();
                }
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
        public static void DeleteCheckout(int id, FsDB db)
        {
            try
            {
                Checkout? _checkout = db.checkouts.FirstOrDefault(c => c.Id == id);
                if (_checkout is not null)
                {
                    db.checkouts.Remove(_checkout);
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
