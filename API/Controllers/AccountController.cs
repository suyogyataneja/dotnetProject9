using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager):BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {

        var user = new User
        {
            UserName = registerDto.Email,
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName
        };
        var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);
        if (result.Succeeded)  return Ok();

        foreach (var error in result.Errors)
        {   
            ModelState.AddModelError(error.Code,error.Description);
        }

        return ValidationProblem();
    }

}