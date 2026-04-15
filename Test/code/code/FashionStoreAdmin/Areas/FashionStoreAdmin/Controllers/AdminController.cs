using FashionStoreAdmin.Models;
using FashionStoreAdmin.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FashionStoreAdmin.Areas.FashionStoreAdmin.Controllers;

[Area("FashionStoreAdmin")]
public class AdminController(FakeDataService dataService, IWebHostEnvironment environment) : Controller
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var employeeId = HttpContext.Session.GetInt32("EmployeeId");
        var role = HttpContext.Session.GetString("EmployeeRole");
        var action = context.RouteData.Values["action"]?.ToString() ?? string.Empty;

        if (employeeId is null)
        {
            context.Result = RedirectToAction("Login", "Account");
            return;
        }

        var staffAllowedActions = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            nameof(Orders),
            nameof(OrderDetail),
            nameof(UpdateOrderStatus),
            nameof(ConfirmOrder),
            nameof(AddOrder)
        };

        if (string.Equals(role, EmployeeRole.Staff.ToString(), StringComparison.OrdinalIgnoreCase) &&
            !staffAllowedActions.Contains(action))
        {
            context.Result = RedirectToAction(nameof(Orders));
            return;
        }

        base.OnActionExecuting(context);
    }

    public IActionResult Index()
    {
        var model = dataService.GetDashboard();
        return View(model);
    }

    public IActionResult Categories()
    {
        var model = new CategoryManagementViewModel
        {
            Categories = dataService.GetCategories(),
            Brands = dataService.GetBrands(),
            Collections = dataService.GetCollections()
        };
        ViewBag.ParentCategories = dataService.GetCategories();
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddCategory(string name, string description, int? parentCategoryId)
    {
        if (!string.IsNullOrWhiteSpace(name))
        {
            dataService.AddCategory(name.Trim(), description?.Trim() ?? string.Empty, parentCategoryId);
        }

        return RedirectToAction(nameof(Categories));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateCategory(Category category)
    {
        if (!string.IsNullOrWhiteSpace(category.Name))
        {
            category.Name = category.Name.Trim();
            category.Description = category.Description?.Trim() ?? string.Empty;
            if (category.ParentCategoryId == category.Id)
            {
                category.ParentCategoryId = null;
            }
            dataService.UpdateCategory(category);
        }

        return RedirectToAction(nameof(Categories));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteCategory(int id)
    {
        dataService.DeleteCategory(id);
        return RedirectToAction(nameof(Categories));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddBrand(string name)
    {
        if (!string.IsNullOrWhiteSpace(name))
        {
            dataService.AddBrand(name.Trim());
        }
        return RedirectToAction(nameof(Categories));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddCollection(string name, string season)
    {
        if (!string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(season))
        {
            dataService.AddCollection(name.Trim(), season.Trim());
        }
        return RedirectToAction(nameof(Categories));
    }

    public IActionResult Products()
    {
        var model = new ProductManagementViewModel
        {
            Products = dataService.GetProducts(),
            Categories = dataService.GetCategories(),
            Brands = dataService.GetBrands(),
            Collections = dataService.GetCollections(),
            Variants = dataService.GetProductVariants(),
            Images = dataService.GetProductImages()
        };
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddProduct(Product product, List<IFormFile>? imageFiles)
    {
        if (!string.IsNullOrWhiteSpace(product.Name) && product.Price >= 0 && product.Stock >= 0 && product.OriginalPrice >= 0)
        {
            product.Name = product.Name.Trim();
            product.Description = product.Description?.Trim() ?? string.Empty;
            product.Size = product.Size?.Trim() ?? string.Empty;
            product.Color = product.Color?.Trim() ?? string.Empty;
            var productId = dataService.AddProduct(product);
            SaveUploadedImages(productId, imageFiles, "Ảnh sản phẩm");
        }

        return RedirectToAction(nameof(Products));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateProduct(Product product, List<IFormFile>? imageFiles)
    {
        if (!string.IsNullOrWhiteSpace(product.Name))
        {
            dataService.UpdateProduct(product);
            SaveUploadedImages(product.Id, imageFiles, "Ảnh cập nhật");
        }
        return RedirectToAction(nameof(Products));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteProduct(int id)
    {
        dataService.DeleteProduct(id);
        return RedirectToAction(nameof(Products));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddVariant(int productId, string size, string color, decimal price, int stock)
    {
        if (productId > 0 && !string.IsNullOrWhiteSpace(size) && !string.IsNullOrWhiteSpace(color) && price >= 0 && stock >= 0)
        {
            dataService.AddVariant(productId, size.Trim(), color.Trim(), price, stock);
        }
        return RedirectToAction(nameof(Products));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddImage(int productId, string imageUrl, string caption)
    {
        if (productId > 0 && !string.IsNullOrWhiteSpace(imageUrl))
        {
            dataService.AddImage(productId, imageUrl.Trim(), caption?.Trim() ?? string.Empty);
        }
        return RedirectToAction(nameof(Products));
    }

    private void SaveUploadedImages(int productId, List<IFormFile>? imageFiles, string captionPrefix)
    {
        if (productId <= 0 || imageFiles is null || imageFiles.Count == 0)
        {
            return;
        }

        var uploadRoot = Path.Combine(environment.WebRootPath, "uploads", "products");
        Directory.CreateDirectory(uploadRoot);

        foreach (var file in imageFiles.Where(f => f.Length > 0))
        {
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            var allowed = new[] { ".jpg", ".jpeg", ".png", ".webp" };
            if (!allowed.Contains(extension))
            {
                continue;
            }

            var fileName = $"{productId}_{Guid.NewGuid():N}{extension}";
            var absolutePath = Path.Combine(uploadRoot, fileName);
            using var stream = System.IO.File.Create(absolutePath);
            file.CopyTo(stream);

            var relativePath = $"/uploads/products/{fileName}";
            dataService.AddImage(productId, relativePath, $"{captionPrefix} {DateTime.Now:dd/MM/yyyy HH:mm}");
        }
    }

    public IActionResult Orders()
    {
        var orders = dataService.GetOrders();
        return View(orders);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddOrder(string customerName, decimal totalAmount, OrderStatus status)
    {
        if (!string.IsNullOrWhiteSpace(customerName) && totalAmount >= 0)
        {
            dataService.AddOrder(customerName.Trim(), totalAmount, status);
        }

        return RedirectToAction(nameof(Orders));
    }

    public IActionResult OrderDetail(int id)
    {
        var order = dataService.GetOrderById(id);
        if (order is null)
        {
            return RedirectToAction(nameof(Orders));
        }
        return View(order);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateOrderStatus(int orderId, OrderStatus status)
    {
        dataService.UpdateOrderStatus(orderId, status);
        return RedirectToAction(nameof(Orders));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ConfirmOrder(int orderId)
    {
        dataService.UpdateOrderStatus(orderId, OrderStatus.Shipping);
        return RedirectToAction(nameof(Orders));
    }

    public IActionResult Users()
    {
        return View(new UserManagementViewModel { Users = dataService.GetUsersWithHistory() });
    }

    public IActionResult Employees()
    {
        return View(new EmployeeManagementViewModel { Employees = dataService.GetEmployees() });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddEmployee(string fullName, string email, string phoneNumber, string password, EmployeeRole role)
    {
        if (!string.IsNullOrWhiteSpace(fullName) &&
            !string.IsNullOrWhiteSpace(email) &&
            !string.IsNullOrWhiteSpace(phoneNumber) &&
            !string.IsNullOrWhiteSpace(password))
        {
            dataService.AddEmployee(fullName.Trim(), email.Trim(), phoneNumber.Trim(), password.Trim(), role);
        }
        return RedirectToAction(nameof(Employees));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateEmployee(int id, string fullName, string phoneNumber, EmployeeRole role)
    {
        if (!string.IsNullOrWhiteSpace(fullName) && !string.IsNullOrWhiteSpace(phoneNumber))
        {
            dataService.UpdateEmployee(id, fullName.Trim(), phoneNumber.Trim(), role);
        }
        return RedirectToAction(nameof(Employees));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ResetEmployeePassword(int id, string newPassword)
    {
        if (!string.IsNullOrWhiteSpace(newPassword))
        {
            dataService.ResetEmployeePassword(id, newPassword.Trim());
        }
        return RedirectToAction(nameof(Employees));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DeleteEmployee(int id)
    {
        dataService.BlockEmployee(id);
        return RedirectToAction(nameof(Employees));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ToggleEmployeeStatus(int id)
    {
        dataService.ToggleEmployeeStatus(id);
        return RedirectToAction(nameof(Employees));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddInternalUser(string fullName, string email, string phoneNumber, UserRole role)
    {
        if (!string.IsNullOrWhiteSpace(fullName) && !string.IsNullOrWhiteSpace(email) && !string.IsNullOrWhiteSpace(phoneNumber))
        {
            dataService.AddInternalUser(fullName.Trim(), email.Trim(), phoneNumber.Trim(), role);
        }
        return RedirectToAction(nameof(Users));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ToggleUserLock(int userId)
    {
        dataService.ToggleUserLock(userId);
        return RedirectToAction(nameof(Users));
    }

    public IActionResult Promotions()
    {
        return View(new PromotionManagementViewModel { Promotions = dataService.GetPromotions() });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddPromotion(string code, PromotionType type, decimal value, DateTime startDate, DateTime endDate, int maxUse)
    {
        if (!string.IsNullOrWhiteSpace(code) && maxUse > 0 && startDate <= endDate)
        {
            dataService.AddPromotion(code.Trim(), type, value, startDate, endDate, maxUse);
        }
        return RedirectToAction(nameof(Promotions));
    }
}

