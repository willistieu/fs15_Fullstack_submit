using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Quantity { get; set; }
        public DateTime createdDate { get; set; } = DateTime.Now;
    }
}
