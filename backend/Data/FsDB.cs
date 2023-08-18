using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class FsDB : DbContext
    {
        public FsDB(DbContextOptions<FsDB> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //config primary key(User)
            modelBuilder.Entity<Product>().HasKey(p => p.Id);
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<Cart>().HasKey(c => c.Id);
            modelBuilder.Entity<Checkout>().HasKey(c => c.Id);
        }

        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<Checkout> checkouts { get; set; }
    }
}
