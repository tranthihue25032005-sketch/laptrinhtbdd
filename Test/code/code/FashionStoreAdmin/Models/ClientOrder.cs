namespace FashionStoreAdmin.Models;

public class ClientOrder
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }

    // Requirement: store to DB as string
    public string PaymentMethod { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }

    public List<ClientOrderDetail> OrderDetails { get; set; } = [];
}

