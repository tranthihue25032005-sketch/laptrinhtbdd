using FashionStoreAdmin.Models;
using FashionStoreAdmin.Services;
using Microsoft.AspNetCore.Mvc;

namespace FashionStoreAdmin.Areas.FashionStoreAdmin.Controllers;

[Area("FashionStoreAdmin")]
public class AccountController(FakeDataService dataService) : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        if (HttpContext.Session.GetInt32("EmployeeId") is not null)
        {
            return RedirectToAction("Index", "Admin");
        }

        return View(new LoginViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Login(LoginViewModel model)
    {
        if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
        {
            model.ErrorMessage = "Vui lòng nhập email và mật khẩu.";
            return View(model);
        }

        var employee = dataService.ValidateEmployee(model.Email.Trim(), model.Password);
        if (employee is null)
        {
            model.ErrorMessage = "Tài khoản không hợp lệ hoặc đã bị khóa.";
            return View(model);
        }

        HttpContext.Session.SetInt32("EmployeeId", employee.Id);
        HttpContext.Session.SetString("EmployeeName", employee.FullName);
        HttpContext.Session.SetString("EmployeeRole", employee.Role.ToString());

        return RedirectToAction("Index", "Admin");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return RedirectToAction(nameof(Login));
    }
}

