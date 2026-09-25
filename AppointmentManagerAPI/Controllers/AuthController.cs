using AppointmentManagerAPI.Data;
using AppointmentManagerAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AppointmentManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(
                u => u.Username == dto.Username &&
                     u.Password == dto.Password);

            if (user == null)
            {
                return Unauthorized("Username or password is incorrect.");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("AppointmentManagerSecretKey12345"));

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: credentials);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}
