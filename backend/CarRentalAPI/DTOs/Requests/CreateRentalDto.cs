namespace CarRentalAPI.DTOs.Requests
{
    public class CreateRentalDto
    {
        public int CarID { get; set; }
        public int CustomerID { get; set; }
        public DateTime RentalStart { get; set; }
        public DateTime RentalEnd { get; set; }
        public int RentalStatus { get; set; }
    }
}