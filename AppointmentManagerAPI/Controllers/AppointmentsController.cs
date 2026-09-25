using AppointmentManagerAPI.Data;
using AppointmentManagerAPI.DTOs;
using AppointmentManagerAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace AppointmentManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentDto>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            return Ok(new AppointmentDto
            {
                Id = appointment.Id,
                Title = appointment.Title,
                Date = appointment.Date,
                Time = appointment.Time,
                Description = appointment.Description,
                CategoryId = appointment.CategoryId
            });
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> CreateAppointment(AppointmentDto dto)
        {
            var appointment = new Appointment
            {
                Title = dto.Title,
                Date = dto.Date,
                Time = dto.Time,
                Description = dto.Description,
                CategoryId = dto.CategoryId
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            dto.Id = appointment.Id;

            return CreatedAtAction(
                nameof(GetAppointment),
                new { id = appointment.Id },
                dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointment(
            int id, AppointmentDto dto)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            appointment.Title = dto.Title;
            appointment.Date = dto.Date;
            appointment.Time = dto.Time;
            appointment.Description = dto.Description;
            appointment.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}