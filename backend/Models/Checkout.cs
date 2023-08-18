using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Checkout
    {
        [Key]
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public int CustomerId { get; set; }
        public double Amount { get; set; }
        public int cartId { get; set; }
        public DateTime createdDate { get; set; } = DateTime.Now;
    }
}
