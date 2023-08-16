using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; } = decimal.Zero;
        public string imgUrl { get; set; }
        public string CreateBy { get; set; }
        public string EditedBy { get; set; }
    }
}
