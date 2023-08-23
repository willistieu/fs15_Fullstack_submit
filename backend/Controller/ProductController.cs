using Azure.Core;
using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller
{
    public static class ProductController
    {
        public static void Map(WebApplication app)
        {
            app.MapGet("/products", ([FromQuery(Name = "offset")] int offset, [FromQuery(Name = "limit")] int limit, FsDB db) =>
           {
               try
               {

                   List<Product> _products = ProductRepository.ProductList(db, offset, limit);
                   if (_products is null) { Results.NotFound(); }

                   return Results.Ok(_products);
               }
               catch (Exception e)
               {

                   Console.WriteLine(e);
                   throw new Exception("An error is exist");
               }


           });
            app.MapGet("/product/length", (FsDB db) =>
            {
                int _productLength = ProductRepository.NumberOfProduct(db);
                return Results.Ok(_productLength);
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
                    db.products.Remove(product);
                    await db.SaveChangesAsync();

                    //ProductRepository.DeleteProduct(id, db);

                    return Results.NoContent();
                }

                return Results.NotFound();
            });
            app.MapPut("/products/{id}", async (int id, Product inputProduct, FsDB db) =>
            {
                var product = await db.products.FindAsync(id);

                if (product is null) return Results.NotFound();

                product.Name = inputProduct.Name;
                product.Description = inputProduct.Description;
                product.Price = inputProduct.Price;
                product.imgUrl = inputProduct.imgUrl;

                await db.SaveChangesAsync();

                //ProductRepository.PutAproduct(id, inputProduct, db);

                return Results.Created($"/products/{product.Id}", product);
            });

        }
    }
}
