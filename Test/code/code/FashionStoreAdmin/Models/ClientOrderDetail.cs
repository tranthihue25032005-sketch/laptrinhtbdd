namespace FashionStoreAdmin.Models;

public class ClientOrderDetail
{
    public int Id { get; set; }

    // FK to ClientOrder
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }

    public ClientOrder Order { get; set; } = null!;
}

