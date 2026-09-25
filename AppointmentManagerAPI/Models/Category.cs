namespace AppointmentManagerAPI.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
