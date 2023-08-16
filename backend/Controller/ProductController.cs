using backend.Data;
using backend.Models;
using backend.Repositories;

namespace backend.Controller
{
    public static class ProductController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/products", (FsDB db) =>
            {
                try
                {
                    List<Product> _products = ProductRepository.ProductList(db);
                    if (_products is null) { Results.NotFound(); }
                    return Results.Ok(_products);
                }
                catch (Exception e)
                {

                    Console.WriteLine(e);
                    throw new Exception($"An error is exist");
                }


            });
            app.MapGet("/products/{id}", (int id, FsDB db) =>
            {
                try
                {
                    Product? _product = ProductRepository.FindProductById(id, db);
                    if (_product is null) return Results.NotFound();
                    return Results.Ok(_product);

                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw new Exception($"An error is exist");
                }
            });

            app.MapPost("/products", async (Product product, FsDB db) =>
            {
                try
                {
                    db.products.Add(product);
                    await db.SaveChangesAsync();

                    return Results.Created($"/products/{product.Id}", product);
                }
                catch (Exception e)
                {

                    Console.WriteLine(e);
                    throw new Exception($"An error is exist");
                }

            });
            app.MapDelete("/products/{id}", async (int id, FsDB db) =>
            {
                if (await db.products.FindAsync(id) is Product product)
                {
                    //db.products.Remove(todo);
                    //await db.SaveChangesAsync();

                    ProductRepository.DeleteProduct(id, db);

                    return Results.NoContent();
                }

                return Results.NotFound();
            });
            app.MapPut("/products/{id}", async (int id, Product inputProduct, FsDB db) =>
            {
                var product = await db.products.FindAsync(id);

                if (product is null) return Results.NotFound();

                //product.Name = inputProduct.Name;
                //product.Description = inputProduct.Description;
                //product.Price = inputProduct.Price;
                //product.imgUrl = inputProduct.imgUrl;

                //await db.SaveChangesAsync();mmmmm  yu

                ProductRepository.PutAproduct(id, inputProduct, db);

                return Results.NoContent();
            });

        }
    }
}
