namespace CarRentalAPI.DTOs.Requests
{
    public class CreateFeedbackDto
    {
        public int CarID { get; set; }
        public int CustomerID { get; set; }
        public string FeedbackDescription { get; set; }
        public int Rate { get; set; }
    }
}