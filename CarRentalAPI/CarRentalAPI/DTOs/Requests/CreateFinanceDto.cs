namespace CarRentalAPI.DTOs.Requests
{
    public class CreateFinanceDto
    {
        public int AccID { get; set; }
        public DateTime Date { get; set; }
        public int TotalMoney { get; set; }
    }
}