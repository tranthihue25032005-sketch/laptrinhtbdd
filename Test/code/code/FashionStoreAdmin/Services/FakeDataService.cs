using FashionStoreAdmin.Models;

namespace FashionStoreAdmin.Services;

public class FakeDataService
{
    private readonly List<Category> _categories;
    private readonly List<Brand> _brands;
    private readonly List<Collection> _collections;
    private readonly List<Product> _products;
    private readonly List<ProductVariant> _variants;
    private readonly List<ProductImage> _images;
    private readonly List<Order> _orders;
    private readonly List<UserAccount> _users;
    private readonly List<EmployeeAccount> _employees;
    private readonly List<Promotion> _promotions;

    private int _nextCategoryId;
    private int _nextBrandId;
    private int _nextCollectionId;
    private int _nextProductId;
    private int _nextVariantId;
    private int _nextImageId;
    private int _nextOrderId;
    private int _nextUserId;
    private int _nextEmployeeId;
    private int _nextPromotionId;

    public FakeDataService()
    {
        _categories =
        [
            new Category { Id = 1, Name = "Thời trang Nam", Description = "Danh mục thời trang nam" },
            new Category { Id = 2, Name = "Áo", Description = "Áo thun, áo sơ mi, áo khoác", ParentCategoryId = 1 },
            new Category { Id = 3, Name = "Quần", Description = "Quần jean, quần tây, quần short", ParentCategoryId = 1 },
            new Category { Id = 4, Name = "Phụ kiện", Description = "Túi xách, thắt lưng, nón" }
        ];

        _brands =
        [
            new Brand { Id = 1, Name = "Urban Style" },
            new Brand { Id = 2, Name = "Monotone" }
        ];

        _collections =
        [
            new Collection { Id = 1, Name = "Thu Đông 2026", Season = "Thu Đông" },
            new Collection { Id = 2, Name = "Xuân Hè 2026", Season = "Xuân Hè" }
        ];

        _products =
        [
            new Product { Id = 1, Name = "Áo thun basic", Description = "Chất liệu cotton co giãn", CategoryId = 2, BrandId = 1, CollectionId = 2, Price = 199000, OriginalPrice = 249000, Stock = 120, Size = "M", Color = "Trắng", IsActive = true },
            new Product { Id = 2, Name = "Quần jean slim fit", Description = "Form slim fit trẻ trung", CategoryId = 3, BrandId = 2, CollectionId = 1, Price = 499000, OriginalPrice = 599000, Stock = 80, Size = "L", Color = "Xanh", IsActive = true },
            new Product { Id = 3, Name = "Túi đeo chéo", Description = "Phụ kiện thời trang unisex", CategoryId = 4, BrandId = 1, CollectionId = 1, Price = 349000, OriginalPrice = 399000, Stock = 45, Size = "Free", Color = "Đen", IsActive = true }
        ];

        _variants =
        [
            new ProductVariant { Id = 1, ProductId = 1, Size = "S", Color = "Trắng", Price = 199000, Stock = 8 },
            new ProductVariant { Id = 2, ProductId = 1, Size = "M", Color = "Đen", Price = 209000, Stock = 4 },
            new ProductVariant { Id = 3, ProductId = 2, Size = "M", Color = "Xanh", Price = 499000, Stock = 7 },
            new ProductVariant { Id = 4, ProductId = 2, Size = "L", Color = "Xanh đậm", Price = 499000, Stock = 3 }
        ];

        _images =
        [
            new ProductImage { Id = 1, ProductId = 1, Caption = "Mặt trước", ImageUrl = "https://picsum.photos/seed/aothun-front/300/200" },
            new ProductImage { Id = 2, ProductId = 1, Caption = "Mặt sau", ImageUrl = "https://picsum.photos/seed/aothun-back/300/200" },
            new ProductImage { Id = 3, ProductId = 2, Caption = "Chi tiết chất vải", ImageUrl = "https://picsum.photos/seed/jean-detail/300/200" }
        ];

        _orders =
        [
            new Order
            {
                Id = 1, CustomerName = "Nguyễn Văn A", PhoneNumber = "0901112233", ShippingAddress = "Quận 1, TP.HCM",
                OrderDate = DateTime.Today.AddDays(-2), TotalAmount = 798000, Status = OrderStatus.Completed,
                Items = [new OrderItem { ProductId = 1, ProductName = "Áo thun basic", Size = "M", Color = "Trắng", Quantity = 2, UnitPrice = 199000 }]
            },
            new Order
            {
                Id = 2, CustomerName = "Trần Thị B", PhoneNumber = "0902223344", ShippingAddress = "Quận Hai Bà Trưng, Hà Nội",
                OrderDate = DateTime.Today.AddDays(-1), TotalAmount = 499000, Status = OrderStatus.Shipping,
                Items = [new OrderItem { ProductId = 2, ProductName = "Quần jean slim fit", Size = "L", Color = "Xanh", Quantity = 1, UnitPrice = 499000 }]
            },
            new Order
            {
                Id = 3, CustomerName = "Lê Minh C", PhoneNumber = "0903334455", ShippingAddress = "Hải Châu, Đà Nẵng",
                OrderDate = DateTime.Today, TotalAmount = 1098000, Status = OrderStatus.Pending,
                Items =
                [
                    new OrderItem { ProductId = 1, ProductName = "Áo thun basic", Size = "S", Color = "Đen", Quantity = 1, UnitPrice = 209000 },
                    new OrderItem { ProductId = 3, ProductName = "Túi đeo chéo", Size = "Free", Color = "Đen", Quantity = 1, UnitPrice = 349000 }
                ]
            }
        ];

        _users =
        [
            new UserAccount { Id = 1, FullName = "Nguyễn Văn A", Email = "nguyenvana@gmail.com", PhoneNumber = "0901112233", Password = "123456", Role = UserRole.Sale, IsLocked = false, TotalOrders = 1 },
            new UserAccount { Id = 2, FullName = "Trần Thị B", Email = "tranthib@gmail.com", PhoneNumber = "0902223344", Password = "123456", Role = UserRole.Sale, IsLocked = false, TotalOrders = 1 },
            new UserAccount { Id = 3, FullName = "Lê Minh C", Email = "leminhc@gmail.com", PhoneNumber = "0903334455", Password = "123456", Role = UserRole.Sale, IsLocked = false, TotalOrders = 1 }
        ];

        _employees =
        [
            new EmployeeAccount
            {
                Id = 1,
                FullName = "Quản trị hệ thống",
                Username = "huetran2503",
                Email = "huetran2503@gmail.com",
                PhoneNumber = "0909000001",
                Password = "250325@",
                Role = EmployeeRole.Admin,
                Status = EmployeeStatus.Active
            },
            new EmployeeAccount
            {
                Id = 2,
                FullName = "Nhân viên bán hàng 1",
                Username = "huetran1",
                Email = "huetran1@fashion.vn",
                PhoneNumber = "0909000002",
                Password = "250325@",
                Role = EmployeeRole.Staff,
                Status = EmployeeStatus.Active
            }
        ];

        _promotions =
        [
            new Promotion
            {
                Id = 1, Code = "SUMMER10", Type = PromotionType.Percent, Value = 10,
                StartDate = DateTime.Today.AddDays(-5), EndDate = DateTime.Today.AddDays(25), MaxUse = 100, UsedCount = 32
            },
            new Promotion
            {
                Id = 2, Code = "FREESHIP", Type = PromotionType.FreeShipping, Value = 0,
                StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(15), MaxUse = 200, UsedCount = 44
            }
        ];

        _nextCategoryId = _categories.Max(x => x.Id) + 1;
        _nextBrandId = _brands.Max(x => x.Id) + 1;
        _nextCollectionId = _collections.Max(x => x.Id) + 1;
        _nextProductId = _products.Max(x => x.Id) + 1;
        _nextVariantId = _variants.Max(x => x.Id) + 1;
        _nextImageId = _images.Max(x => x.Id) + 1;
        _nextOrderId = _orders.Max(x => x.Id) + 1;
        _nextUserId = _users.Max(x => x.Id) + 1;
        _nextEmployeeId = _employees.Max(x => x.Id) + 1;
        _nextPromotionId = _promotions.Max(x => x.Id) + 1;
    }

    public DashboardOverviewViewModel GetDashboard()
    {
        var startOfWeek = DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek + 1);
        var startOfMonth = new DateTime(DateTime.Today.Year, DateTime.Today.Month, 1);
        var revenueMonth = _orders.Where(o => o.OrderDate >= startOfMonth).Sum(o => o.TotalAmount);
        var newOrdersToday = _orders.Count(o => o.OrderDate.Date == DateTime.Today);
        var customersWeek = _orders.Where(o => o.OrderDate >= startOfWeek).Select(o => o.CustomerName).Distinct().Count();
        var topSelling = _orders
            .SelectMany(o => o.Items)
            .GroupBy(i => new { i.ProductId, i.ProductName })
            .Select(g => new TopSellingProduct
            {
                ProductId = g.Key.ProductId,
                ProductName = g.Key.ProductName,
                SoldQuantity = g.Sum(x => x.Quantity)
            })
            .OrderByDescending(x => x.SoldQuantity)
            .Take(5)
            .ToList();

        var lowStock = _variants
            .Where(v => v.Stock <= 5)
            .Join(_products, v => v.ProductId, p => p.Id, (v, p) => new StockAlert
            {
                ProductId = p.Id,
                ProductName = p.Name,
                VariantName = $"Size {v.Size} / {v.Color}",
                RemainingStock = v.Stock
            })
            .OrderBy(x => x.RemainingStock)
            .ToList();

        var totalCustomers = _orders.Select(o => o.CustomerName).Distinct().Count();
        var totalOrdersAll = _orders.Count;
        var avgOrderValue = totalOrdersAll > 0 ? _orders.Average(o => o.TotalAmount) : 0;
        var productsNam = _products.Count(p => p.CategoryId is 2 or 3);
        var productsNu = _products.Count(p => p.CategoryId == 4);
        var revenueDays = Enumerable.Range(0, 6)
            .Select(i =>
            {
                var day = DateTime.Today.AddDays(-5 + i);
                var dayTotal = _orders.Where(o => o.OrderDate.Date == day.Date).Sum(o => o.TotalAmount);
                return new RevenueDayPoint { Label = day.ToString("dd/MM"), Amount = dayTotal };
            }).ToList();

        var maxSold = topSelling.Count > 0 ? topSelling.Max(x => x.SoldQuantity) : 1;
        var campaigns = topSelling.Take(4)
            .Select(x => new NamedPercentItem
            {
                Name = x.ProductName.Length > 28 ? x.ProductName[..28] + "…" : x.ProductName,
                Percent = (int)Math.Round(100m * x.SoldQuantity / maxSold)
            }).ToList();
        while (campaigns.Count < 4)
        {
            campaigns.Add(new NamedPercentItem { Name = "—", Percent = 0 });
        }

        var statusCounts = _orders.GroupBy(o => o.Status).ToDictionary(g => g.Key, g => g.Count());
        var statusTotal = statusCounts.Values.Sum();
        var statusOrder = new[] { OrderStatus.Pending, OrderStatus.Confirmed, OrderStatus.Picking, OrderStatus.Shipping, OrderStatus.Completed, OrderStatus.Cancelled };
        var orderBars = statusOrder
            .Where(s => statusCounts.ContainsKey(s))
            .Select(s => new NamedPercentItem
            {
                Name = s switch
                {
                    OrderStatus.Pending => "Chờ xác nhận",
                    OrderStatus.Confirmed => "Đã xác nhận",
                    OrderStatus.Picking => "Đang lấy hàng",
                    OrderStatus.Shipping => "Đang giao",
                    OrderStatus.Completed => "Hoàn tất",
                    OrderStatus.Cancelled => "Đã hủy",
                    _ => s.ToString()
                },
                Percent = statusTotal > 0 ? (int)Math.Round(100m * statusCounts[s] / statusTotal) : 0,
                Extra = $"{statusCounts[s]} đơn"
            }).ToList();
        while (orderBars.Count < 6)
        {
            orderBars.Add(new NamedPercentItem { Name = "—", Percent = 0, Extra = "" });
        }
        orderBars = orderBars.Take(6).ToList();

        var catTotal = _products.Count;
        var catGroups = _products
            .GroupBy(p => _categories.FirstOrDefault(c => c.Id == p.CategoryId)?.Name ?? "Khác")
            .Select(g => new { Name = g.Key, Cnt = g.Count() })
            .OrderByDescending(x => x.Cnt)
            .ToList();
        var donut = catGroups.Select(g => new NamedPercentItem
        {
            Name = g.Name,
            Percent = catTotal > 0 ? (int)Math.Round(100m * g.Cnt / catTotal) : 0
        }).ToList();

        return new DashboardOverviewViewModel
        {
            Metrics =
            [
                new DashboardMetric { Label = "Tổng doanh thu tháng", Value = $"{revenueMonth:N0} VND", Description = "Doanh thu trong tháng hiện tại" },
                new DashboardMetric { Label = "Đơn hàng mới hôm nay", Value = newOrdersToday.ToString(), Description = "Số đơn cần xử lý trong ngày" },
                new DashboardMetric { Label = "Khách hàng trong tuần", Value = customersWeek.ToString(), Description = "Số khách phát sinh mua hàng" },
                new DashboardMetric { Label = "Sản phẩm đang bán", Value = _products.Count(p => p.IsActive).ToString(), Description = "Sản phẩm đang ở trạng thái kích hoạt" }
            ],
            Tiles =
            [
                new DashboardTileGentelella { Title = "Tổng khách hàng", Value = totalCustomers.ToString("N0"), ChangeText = "+4% so với tuần trước", IconClass = "fa-solid fa-users" },
                new DashboardTileGentelella { Title = "Giá trị đơn TB", Value = $"{avgOrderValue:N0} ₫", ChangeText = "+3% so với tuần trước", IconClass = "fa-solid fa-clock" },
                new DashboardTileGentelella { Title = "SP thời trang nam", Value = productsNam.ToString("N0"), ChangeText = "+12%", IconClass = "fa-solid fa-shirt" },
                new DashboardTileGentelella { Title = "SP phụ kiện / nữ", Value = productsNu.ToString("N0"), ChangeText = "+8%", IconClass = "fa-solid fa-bag-shopping" },
                new DashboardTileGentelella { Title = "Bộ sưu tập", Value = _collections.Count.ToString("N0"), ChangeText = "+15%", IconClass = "fa-solid fa-layer-group" },
                new DashboardTileGentelella { Title = "Tổng đơn hàng", Value = totalOrdersAll.ToString("N0"), ChangeText = "+22%", IconClass = "fa-solid fa-link" }
            ],
            RevenueLastDays = revenueDays,
            SellingCampaigns = campaigns,
            OrderStatusBars = orderBars,
            CategoryDonut = donut.Count > 0 ? donut : [new NamedPercentItem { Name = "Chưa có dữ liệu", Percent = 100 }],
            TopSellingProducts = topSelling,
            LowStockAlerts = lowStock,
            RecentOrders = _orders.OrderByDescending(o => o.OrderDate).Take(5).ToList()
        };
    }

    public IReadOnlyList<Category> GetCategories() => _categories.OrderBy(c => c.Id).ToList();
    public IReadOnlyList<Brand> GetBrands() => _brands.OrderBy(c => c.Id).ToList();
    public IReadOnlyList<Collection> GetCollections() => _collections.OrderBy(c => c.Id).ToList();

    public IReadOnlyList<Product> GetProducts() => _products.OrderBy(p => p.Id).ToList();
    public IReadOnlyList<Product> GetActiveProducts(string? search = null, int? categoryId = null, decimal? minPrice = null, decimal? maxPrice = null)
    {
        var query = _products.Where(p => p.IsActive).AsEnumerable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p => p.Name.Contains(search, StringComparison.OrdinalIgnoreCase));
        }
        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }
        if (minPrice.HasValue)
        {
            query = query.Where(p => p.Price >= minPrice.Value);
        }
        if (maxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= maxPrice.Value);
        }
        return query.OrderByDescending(p => p.Id).ToList();
    }
    public Product? GetProductById(int id) => _products.FirstOrDefault(p => p.Id == id && p.IsActive);
    public IReadOnlyList<ProductVariant> GetProductVariants() => _variants.OrderBy(v => v.ProductId).ThenBy(v => v.Id).ToList();
    public IReadOnlyList<ProductVariant> GetVariantsByProductId(int productId) => _variants.Where(v => v.ProductId == productId).OrderBy(v => v.Id).ToList();
    public IReadOnlyList<ProductImage> GetProductImages() => _images.OrderBy(v => v.ProductId).ThenBy(v => v.Id).ToList();
    public IReadOnlyList<ProductImage> GetImagesByProductId(int productId) => _images.Where(v => v.ProductId == productId).OrderBy(v => v.Id).ToList();

    public IReadOnlyList<Order> GetOrders() => _orders.OrderByDescending(o => o.OrderDate).ThenByDescending(o => o.Id).ToList();
    public Order? GetOrderById(int id) => _orders.FirstOrDefault(x => x.Id == id);
    public IReadOnlyList<UserWithHistory> GetUsersWithHistory()
    {
        return _users
            .OrderBy(x => x.Id)
            .Select(user =>
            {
                var histories = _orders
                    .Where(o =>
                        o.CustomerName.Equals(user.FullName, StringComparison.OrdinalIgnoreCase) ||
                        (!string.IsNullOrWhiteSpace(user.PhoneNumber) && o.PhoneNumber == user.PhoneNumber))
                    .OrderByDescending(o => o.OrderDate)
                    .Select(o => new UserPurchaseHistory
                    {
                        OrderId = o.Id,
                        OrderDate = o.OrderDate,
                        TotalAmount = o.TotalAmount,
                        StatusText = o.Status switch
                        {
                            OrderStatus.Pending => "Chờ xác nhận",
                            OrderStatus.Confirmed => "Chờ xác nhận",
                            OrderStatus.Picking => "Đang giao",
                            OrderStatus.Shipping => "Đang giao",
                            OrderStatus.Completed => "Đã giao",
                            OrderStatus.Cancelled => "Đã hủy",
                            _ => o.Status.ToString()
                        }
                    })
                    .ToList();

                user.TotalOrders = histories.Count;
                return new UserWithHistory { User = user, PurchaseHistory = histories };
            })
            .ToList();
    }
    public IReadOnlyList<EmployeeAccount> GetEmployees() => _employees.OrderBy(x => x.Id).ToList();
    public UserAccount? ValidateUser(string email, string password)
    {
        return _users.FirstOrDefault(x =>
            x.Email.Equals(email, StringComparison.OrdinalIgnoreCase) &&
            x.Password == password &&
            !x.IsLocked);
    }
    public bool RegisterUser(string fullName, string email, string phoneNumber, string password)
    {
        if (_users.Any(x => x.Email.Equals(email, StringComparison.OrdinalIgnoreCase)))
        {
            return false;
        }

        _users.Add(new UserAccount
        {
            Id = _nextUserId++,
            FullName = fullName,
            Email = email,
            PhoneNumber = phoneNumber,
            Password = password,
            Role = UserRole.Sale,
            IsLocked = false,
            TotalOrders = 0
        });
        return true;
    }
    public IReadOnlyList<Order> GetOrdersByUserEmail(string email)
    {
        return _orders
            .Where(x => x.UserEmail.Equals(email, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(x => x.OrderDate)
            .ToList();
    }
    public EmployeeAccount? ValidateEmployee(string email, string password)
    {
        return _employees.FirstOrDefault(x =>
            (x.Email.Equals(email, StringComparison.OrdinalIgnoreCase) ||
             x.Username.Equals(email, StringComparison.OrdinalIgnoreCase)) &&
            x.Password == password &&
            x.Status == EmployeeStatus.Active);
    }
    public IReadOnlyList<Promotion> GetPromotions() => _promotions.OrderByDescending(x => x.Id).ToList();

    public void AddCategory(string name, string description, int? parentCategoryId)
    {
        _categories.Add(new Category
        {
            Id = _nextCategoryId++,
            Name = name,
            Description = description,
            ParentCategoryId = parentCategoryId
        });
    }

    public void UpdateCategory(Category model)
    {
        var category = _categories.FirstOrDefault(x => x.Id == model.Id);
        if (category is null)
        {
            return;
        }

        category.Name = model.Name;
        category.Description = model.Description;
        category.ParentCategoryId = model.ParentCategoryId;
    }

    public void DeleteCategory(int id)
    {
        _categories.RemoveAll(x => x.Id == id);
        foreach (var item in _categories.Where(x => x.ParentCategoryId == id))
        {
            item.ParentCategoryId = null;
        }
    }

    public void AddBrand(string name)
    {
        _brands.Add(new Brand { Id = _nextBrandId++, Name = name });
    }

    public void AddCollection(string name, string season)
    {
        _collections.Add(new Collection { Id = _nextCollectionId++, Name = name, Season = season });
    }

    public int AddProduct(Product product)
    {
        product.Id = _nextProductId++;
        _products.Add(product);
        return product.Id;
    }

    public void UpdateProduct(Product model)
    {
        var product = _products.FirstOrDefault(x => x.Id == model.Id);
        if (product is null)
        {
            return;
        }

        product.Name = model.Name;
        product.Description = model.Description;
        product.CategoryId = model.CategoryId;
        product.BrandId = model.BrandId;
        product.CollectionId = model.CollectionId;
        product.Price = model.Price;
        product.OriginalPrice = model.OriginalPrice;
        product.Stock = model.Stock;
        product.Size = model.Size;
        product.Color = model.Color;
        product.IsActive = model.IsActive;
    }

    public void DeleteProduct(int id)
    {
        _products.RemoveAll(x => x.Id == id);
        _variants.RemoveAll(x => x.ProductId == id);
        _images.RemoveAll(x => x.ProductId == id);
    }

    public void AddVariant(int productId, string size, string color, decimal price, int stock)
    {
        _variants.Add(new ProductVariant
        {
            Id = _nextVariantId++,
            ProductId = productId,
            Size = size,
            Color = color,
            Price = price,
            Stock = stock
        });
    }

    public void AddImage(int productId, string imageUrl, string caption)
    {
        _images.Add(new ProductImage
        {
            Id = _nextImageId++,
            ProductId = productId,
            ImageUrl = imageUrl,
            Caption = caption
        });
    }

    public void AddOrder(string customerName, decimal totalAmount, OrderStatus status)
    {
        _orders.Add(new Order
        {
            Id = _nextOrderId++,
            CustomerName = customerName,
            UserEmail = string.Empty,
            PhoneNumber = "Chưa cập nhật",
            ShippingAddress = "Chưa cập nhật",
            OrderDate = DateTime.Now,
            TotalAmount = totalAmount,
            Status = status
        });
    }

    public Order CreateOrder(string customerName, string userEmail, string phoneNumber, string shippingAddress, List<OrderItem> items)
    {
        var order = new Order
        {
            Id = _nextOrderId++,
            CustomerName = customerName,
            UserEmail = userEmail,
            PhoneNumber = phoneNumber,
            ShippingAddress = shippingAddress,
            OrderDate = DateTime.Now,
            TotalAmount = items.Sum(x => x.UnitPrice * x.Quantity),
            Status = OrderStatus.Pending,
            Items = items
        };
        _orders.Add(order);
        return order;
    }

    public void UpdateOrderStatus(int orderId, OrderStatus status)
    {
        var order = _orders.FirstOrDefault(x => x.Id == orderId);
        if (order is null)
        {
            return;
        }
        order.Status = status;
    }

    public void ToggleUserLock(int userId)
    {
        var user = _users.FirstOrDefault(x => x.Id == userId);
        if (user is null)
        {
            return;
        }
        user.IsLocked = !user.IsLocked;
    }

    public void AddInternalUser(string fullName, string email, string phoneNumber, UserRole role)
    {
        _users.Add(new UserAccount
        {
            Id = _nextUserId++,
            FullName = fullName,
            Email = email,
            PhoneNumber = phoneNumber,
            Password = "123456",
            Role = role,
            IsLocked = false,
            TotalOrders = 0
        });
    }

    public void AddEmployee(string fullName, string email, string phoneNumber, string password, EmployeeRole role)
    {
        var username = email.Contains('@') ? email.Split('@')[0] : email;
        _employees.Add(new EmployeeAccount
        {
            Id = _nextEmployeeId++,
            FullName = fullName,
            Username = username,
            Email = email,
            PhoneNumber = phoneNumber,
            Password = password,
            Role = role,
            Status = EmployeeStatus.Active
        });
    }

    public void UpdateEmployee(int id, string fullName, string phoneNumber, EmployeeRole role)
    {
        var employee = _employees.FirstOrDefault(x => x.Id == id);
        if (employee is null)
        {
            return;
        }

        employee.FullName = fullName;
        employee.PhoneNumber = phoneNumber;
        employee.Role = role;
    }

    public void ResetEmployeePassword(int id, string newPassword)
    {
        var employee = _employees.FirstOrDefault(x => x.Id == id);
        if (employee is null)
        {
            return;
        }
        employee.Password = newPassword;
    }

    public void BlockEmployee(int id)
    {
        var employee = _employees.FirstOrDefault(x => x.Id == id);
        if (employee is null)
        {
            return;
        }
        employee.Status = EmployeeStatus.Blocked;
    }

    public void ToggleEmployeeStatus(int id)
    {
        var employee = _employees.FirstOrDefault(x => x.Id == id);
        if (employee is null)
        {
            return;
        }
        employee.Status = employee.Status == EmployeeStatus.Active ? EmployeeStatus.Blocked : EmployeeStatus.Active;
    }

    public void AddPromotion(string code, PromotionType type, decimal value, DateTime startDate, DateTime endDate, int maxUse)
    {
        _promotions.Add(new Promotion
        {
            Id = _nextPromotionId++,
            Code = code.ToUpperInvariant(),
            Type = type,
            Value = value,
            StartDate = startDate,
            EndDate = endDate,
            MaxUse = maxUse,
            UsedCount = 0
        });
    }
}
