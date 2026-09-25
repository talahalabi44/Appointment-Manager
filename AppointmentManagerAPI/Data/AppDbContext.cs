using AppointmentManagerAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppointmentManagerAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
