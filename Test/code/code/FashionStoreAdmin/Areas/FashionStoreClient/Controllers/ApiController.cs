using FashionStoreAdmin.Models;
using FashionStoreAdmin.Services;
using Microsoft.AspNetCore.Mvc;

namespace FashionStoreAdmin.Areas.FashionStoreClient.Controllers;

[ApiController]
[Area("FashionStoreClient")]
[Route("api")]
public class ApiController : ControllerBase
{
    private readonly FakeDataService _data;

    public ApiController(FakeDataService data)
    {
        _data = data;
    }

    [HttpGet("products")]
    public IActionResult GetProducts([FromQuery] string? search, [FromQuery] int? categoryId, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice)
    {
        var items = _data.GetActiveProducts(search, categoryId, minPrice, maxPrice);
        return Ok(items);
    }

    [HttpGet("products/{id:int}")]
    public IActionResult GetProduct(int id)
    {
        var product = _data.GetProductById(id);
        if (product is null)
        {
            return NotFound(new { message = "Không tìm thấy sản phẩm." });
        }

        return Ok(new
        {
            product,
            variants = _data.GetVariantsByProductId(id),
            images = _data.GetImagesByProductId(id)
        });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] ApiRegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FullName) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Thiếu thông tin bắt buộc." });
        }

        var ok = _data.RegisterUser(request.FullName, request.Email, request.PhoneNumber, request.Password);
        if (!ok)
        {
            return BadRequest(new { message = "Email đã tồn tại." });
        }

        return Ok(new { message = "Đăng ký thành công." });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] ApiLoginRequest request)
    {
        var user = _data.ValidateUser(request.Email, request.Password);
        if (user is null)
        {
            return Unauthorized(new { message = "Email hoặc mật khẩu không đúng." });
        }

        return Ok(new
        {
            message = "Đăng nhập thành công.",
            user = new { user.Id, user.FullName, user.Email, user.PhoneNumber }
        });
    }

    [HttpPost("orders")]
    public IActionResult CreateOrder([FromBody] ApiCreateOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.UserEmail))
        {
            return Unauthorized(new { message = "Cần đăng nhập để đặt hàng." });
        }

        if (string.IsNullOrWhiteSpace(request.CustomerName) ||
            string.IsNullOrWhiteSpace(request.PhoneNumber) ||
            string.IsNullOrWhiteSpace(request.ShippingAddress) ||
            request.Items.Count == 0)
        {
            return BadRequest(new { message = "Thông tin đơn hàng không hợp lệ." });
        }

        var order = _data.CreateOrder(
            request.CustomerName,
            request.UserEmail,
            request.PhoneNumber,
            request.ShippingAddress,
            request.Items);

        return Ok(new { message = "Tạo đơn thành công.", orderId = order.Id });
    }
}

