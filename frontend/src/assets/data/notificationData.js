const notificationDescriptions = [
    { id: 1, Description: "Car rental confirmation", NotificationDate: "2024-10-19" },
    { id: 2, Description: "Car maintenance update", NotificationDate: "2024-09-10" },
    { id: 3, Description: "Rental return reminder", NotificationDate: "2024-10-05" },
    { id: 4, Description: "Rental cancellation notice", NotificationDate: "2024-08-20" },
    { id: 5, Description: "Feedback request", NotificationDate: "2024-07-15" },
  ];
  
  const notificationData = [
    {
      AccID: 1,
      Notifications: [
        notificationDescriptions[0],
        notificationDescriptions[3]
      ],
    },
    {
      AccID: 2,
      Notifications: [
        notificationDescriptions[1]
      ],
    },
    {
      AccID: 3,
      Notifications: [
        notificationDescriptions[2],
        notificationDescriptions[4]
      ],
    },
  ];
  
  export default notificationData;
  