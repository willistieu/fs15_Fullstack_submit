using backend.Data;
using backend.Models;


namespace backend.Repositories
{
    public static class ProductRepository
    {
        public static List<Product> ProductList(FsDB db)
        {

            var _products = db.products;
            return _products.ToList();

        }
        public static Product? FindProductById(int id, FsDB db)
        {
            try
            {
                Product? _product = db.products.FirstOrDefault(p => p.Id == id);

                return _product;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }

        public static async Task PostAnewProduct(Product product, FsDB db)
        {
            try
            {
                await Task.Run(() =>
                {
                    if (product.Id <= 0) db.products.Add(product);
                });
                await Task.Run(() =>
                {
                    db.SaveChangesAsync();
                });
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }

        }
        public static void DeleteProduct(int id, FsDB db)
        {
            try
            {
                Product? _product = db.products.FirstOrDefault(p => p.Id == id);
                if (_product is not null)
                {
                    db.products.Remove(_product);
                    db.SaveChangesAsync();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }


        }
        public static void PutAproduct(int id, Product inputProduct, FsDB db)
        {
            try
            {
                Product? _product = db.products.FirstOrDefault(p => p.Id == id);


                if (_product is not null)
                {
                    _product.Name = inputProduct.Name;
                    _product.Description = inputProduct.Description;
                    _product.Price = inputProduct.Price;
                    _product.imgUrl = inputProduct.imgUrl;
                }

                Console.WriteLine(_product);

                db.SaveChangesAsync();

            }
            catch (Exception e)
            {

                Console.WriteLine(e);
                throw new Exception("An error is exist");
            }
        }
    }
}
