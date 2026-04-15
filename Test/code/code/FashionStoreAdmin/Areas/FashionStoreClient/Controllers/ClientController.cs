using System.Text.Json;
using FashionStoreAdmin.Models;
using FashionStoreAdmin.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FashionStoreAdmin.Areas.FashionStoreClient.Controllers;

[Area("FashionStoreClient")]
public class ClientController : Controller
{
    private const string CartSessionKey = "ClientCart";
    private readonly FakeDataService _data;

    public ClientController(FakeDataService data)
    {
        _data = data;
    }

    public override void OnActionExecuting(ActionExecutingContext context)
    {
        base.OnActionExecuting(context);
        var cart = GetCart();
        ViewBag.CartCount = cart.Sum(x => x.Quantity);
        ViewBag.ClientUserName = HttpContext.Session.GetString("ClientUserName");
        ViewBag.ClientUserEmail = HttpContext.Session.GetString("ClientUserEmail");
    }

    public IActionResult Index()
    {
        var vm = new ClientHomeViewModel
        {
            Categories = _data.GetCategories(),
            FeaturedProducts = _data.GetActiveProducts().Take(8).ToList()
        };
        return View(vm);
    }

    public IActionResult Products(string? search, int? categoryId, decimal? minPrice, decimal? maxPrice)
    {
        var vm = new ClientProductsViewModel
        {
            Search = search ?? string.Empty,
            CategoryId = categoryId,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            Categories = _data.GetCategories(),
            Products = _data.GetActiveProducts(search, categoryId, minPrice, maxPrice)
        };
        return View(vm);
    }

    public IActionResult Product(int id)
    {
        var product = _data.GetProductById(id);
        if (product is null)
        {
            return RedirectToAction(nameof(Products));
        }

        var vm = new ClientProductDetailViewModel
        {
            Product = product,
            Variants = _data.GetVariantsByProductId(id),
            Images = _data.GetImagesByProductId(id),
            Category = _data.GetCategories().FirstOrDefault(c => c.Id == product.CategoryId)
        };
        return View(vm);
    }

    public IActionResult Cart()
    {
        var vm = new CartViewModel { Items = GetCart() };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddToCart(int productId, int quantity = 1, string? size = null, string? color = null)
    {
        var email = HttpContext.Session.GetString("ClientUserEmail");
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["LoginRequiredMessage"] = "Vui lòng đăng nhập để mua hàng.";
            return RedirectToAction(nameof(Login));
        }

        var product = _data.GetProductById(productId);
        if (product is null)
        {
            return RedirectToAction(nameof(Products));
        }

        var variant = _data.GetVariantsByProductId(productId)
            .FirstOrDefault(v =>
                (string.IsNullOrWhiteSpace(size) || v.Size == size) &&
                (string.IsNullOrWhiteSpace(color) || v.Color == color));

        var image = _data.GetImagesByProductId(productId).FirstOrDefault()?.ImageUrl ?? "https://picsum.photos/seed/no-image/300/200";
        var cart = GetCart();
        var matched = cart.FirstOrDefault(x => x.ProductId == productId &&
                                               x.Size == (variant?.Size ?? size ?? product.Size) &&
                                               x.Color == (variant?.Color ?? color ?? product.Color));
        if (matched is null)
        {
            cart.Add(new CartItem
            {
                ProductId = productId,
                ProductName = product.Name,
                ImageUrl = image,
                Size = variant?.Size ?? size ?? product.Size,
                Color = variant?.Color ?? color ?? product.Color,
                Quantity = Math.Max(1, quantity),
                UnitPrice = variant?.Price ?? product.Price
            });
        }
        else
        {
            matched.Quantity += Math.Max(1, quantity);
        }

        SaveCart(cart);
        return RedirectToAction(nameof(Cart));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdateCart(int productId, string size, string color, int quantity)
    {
        var cart = GetCart();
        var item = cart.FirstOrDefault(x => x.ProductId == productId && x.Size == size && x.Color == color);
        if (item is not null)
        {
            if (quantity <= 0)
            {
                cart.Remove(item);
            }
            else
            {
                item.Quantity = quantity;
            }
            SaveCart(cart);
        }
        return RedirectToAction(nameof(Cart));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult RemoveFromCart(int productId, string size, string color)
    {
        var cart = GetCart();
        cart.RemoveAll(x => x.ProductId == productId && x.Size == size && x.Color == color);
        SaveCart(cart);
        return RedirectToAction(nameof(Cart));
    }

    public IActionResult Checkout()
    {
        var email = HttpContext.Session.GetString("ClientUserEmail");
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["LoginRequiredMessage"] = "Vui lòng đăng nhập để thanh toán.";
            return RedirectToAction(nameof(Login));
        }

        var cart = GetCart();
        if (cart.Count == 0)
        {
            return RedirectToAction(nameof(Cart));
        }

        var vm = new CheckoutViewModel
        {
            CustomerName = HttpContext.Session.GetString("ClientUserName") ?? string.Empty,
            Cart = new CartViewModel { Items = cart }
        };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Checkout(CheckoutViewModel model)
    {
        var email = HttpContext.Session.GetString("ClientUserEmail");
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["LoginRequiredMessage"] = "Vui lòng đăng nhập để thanh toán.";
            return RedirectToAction(nameof(Login));
        }

        var cart = GetCart();
        if (cart.Count == 0)
        {
            return RedirectToAction(nameof(Cart));
        }

        if (string.IsNullOrWhiteSpace(model.CustomerName) ||
            string.IsNullOrWhiteSpace(model.PhoneNumber) ||
            string.IsNullOrWhiteSpace(model.Address))
        {
            model.Cart = new CartViewModel { Items = cart };
            return View(model);
        }

        var items = cart.Select(x => new OrderItem
        {
            ProductId = x.ProductId,
            ProductName = x.ProductName,
            Size = x.Size,
            Color = x.Color,
            Quantity = x.Quantity,
            UnitPrice = x.UnitPrice
        }).ToList();

        _data.CreateOrder(
            model.CustomerName,
            email,
            model.PhoneNumber,
            model.Address,
            items);

        SaveCart([]);
        TempData["SuccessMessage"] = "Đặt hàng thành công.";

        return RedirectToAction(nameof(Orders));
    }

    public IActionResult Register()
    {
        return View(new ClientRegisterViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Register(ClientRegisterViewModel model)
    {
        if (string.IsNullOrWhiteSpace(model.FullName) ||
            string.IsNullOrWhiteSpace(model.Email) ||
            string.IsNullOrWhiteSpace(model.Password))
        {
            model.ErrorMessage = "Vui lòng nhập đầy đủ thông tin.";
            return View(model);
        }

        var ok = _data.RegisterUser(model.FullName, model.Email, model.PhoneNumber, model.Password);
        if (!ok)
        {
            model.ErrorMessage = "Email đã tồn tại.";
            return View(model);
        }

        HttpContext.Session.SetString("ClientUserName", model.FullName);
        HttpContext.Session.SetString("ClientUserEmail", model.Email);
        return RedirectToAction(nameof(Index));
    }

    public IActionResult Login()
    {
        return View(new ClientLoginViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Login(ClientLoginViewModel model)
    {
        var user = _data.ValidateUser(model.Email, model.Password);
        if (user is null)
        {
            model.ErrorMessage = "Email hoặc mật khẩu không đúng.";
            return View(model);
        }

        HttpContext.Session.SetString("ClientUserName", user.FullName);
        HttpContext.Session.SetString("ClientUserEmail", user.Email);
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Logout()
    {
        HttpContext.Session.Remove("ClientUserName");
        HttpContext.Session.Remove("ClientUserEmail");
        return RedirectToAction(nameof(Index));
    }

    public IActionResult Orders()
    {
        var email = HttpContext.Session.GetString("ClientUserEmail");
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["LoginRequiredMessage"] = "Vui lòng đăng nhập để xem đơn hàng.";
            return RedirectToAction(nameof(Login));
        }

        var vm = new ClientOrdersViewModel
        {
            Orders = _data.GetOrdersByUserEmail(email)
        };
        return View(vm);
    }

    private List<CartItem> GetCart()
    {
        var json = HttpContext.Session.GetString(CartSessionKey);
        if (string.IsNullOrWhiteSpace(json))
        {
            return [];
        }
        return JsonSerializer.Deserialize<List<CartItem>>(json) ?? [];
    }

    private void SaveCart(List<CartItem> cart)
    {
        HttpContext.Session.SetString(CartSessionKey, JsonSerializer.Serialize(cart));
    }

    // Guest checkout removed: only logged-in users can purchase.
}

