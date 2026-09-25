namespace AppointmentManagerAPI.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public TimeSpan Time { get; set; }

        public string Description { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public Category? Category { get; set; }
    }
}