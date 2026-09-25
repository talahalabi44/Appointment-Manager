using AppointmentManagerAPI.Data;
using AppointmentManagerAPI.DTOs;
using AppointmentManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            });
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory(CategoryDto dto)
        {
            var category = new Category
            {
                Name = dto.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            dto.Id = category.Id;

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoryDto dto)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            category.Name = dto.Name;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

