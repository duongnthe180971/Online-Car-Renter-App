import img01 from "../img/car/nissan-offer.png";
import img02 from "../img/car/offer-toyota.png";
import img03 from "../img/car/bmw-offer.png";
import img04 from "../img/car/nissan-offer.png";
import img05 from "../img/car/offer-toyota.png";
import img06 from "../img/car/mercedes-offer.png";
import img07 from "../img/car/toyota-offer-2.png";
import img08 from "../img/car/mercedes-offer.png";

const carData = [
  {
    id: 1,
    brand: "Tesla",
    rating: 4,
    carName: "Tesla Malibu",
    imgUrl: img01,
    type: "SUV",
    price: 400000,
    seat: 4,
    gear: "Auto",
    fuel: "Electric",
    address: "123 Tran Duy Hung, Cau Giay, Ha Noi",
    description:
      "Tesla Malibu offers a smooth and quiet ride with an all-electric powertrain. It's ideal for those seeking a luxurious, eco-friendly vehicle with advanced technology and premium comfort.",
  },
  {
    id: 2,
    brand: "Toyota",
    rating: 5,
    carName: "Toyota Aventador",
    imgUrl: img02,
    type: "Van",
    price: 500000,
    seat: 6,
    gear: "Manual",
    fuel: "Gasoline",
    address: "45 Nguyen Chi Thanh, Dong Da, Ha Noi",
    description:
      "Toyota Aventador is the ultimate van for family road trips or group travels. Spacious, reliable, and loaded with safety features, it provides comfort for long journeys.",
  },
  {
    id: 3,
    brand: "BMW",
    rating: 4,
    carName: "BMW X3",
    imgUrl: img03,
    type: "SUV",
    price: 300000,
    seat: 4,
    gear: "Auto",
    fuel: "Diesel",
    address: "67 Pham Hung, Nam Tu Liem, Ha Noi",
    description:
      "The BMW X3 is an SUV that blends luxury with performance. Its powerful diesel engine ensures excellent fuel efficiency, while the advanced interior offers premium comfort and connectivity.",
  },
  {
    id: 4,
    brand: "Nissan",
    rating: 4,
    carName: "Nissan Mercielago",
    imgUrl: img04,
    type: "SUV",
    price: 270000,
    seat: 4,
    gear: "Manual",
    fuel: "Gasoline",
    address: "89 Hoang Quoc Viet, Cau Giay, Ha Noi",
    description:
      "Nissan Mercielago is a reliable and affordable SUV with a spacious interior and great handling. Ideal for those who need a practical vehicle for both city and off-road driving.",
  },
  {
    id: 5,
    brand: "Ferrari",
    rating: 4,
    carName: "Ferrari Camry",
    imgUrl: img05,
    type: "SUV",
    price: 450000,
    seat: 8,
    gear: "Semi-Auto",
    fuel: "Gasoline",
    address: "101 Doi Can, Ba Dinh, Ha Noi",
    description:
      "The Ferrari Camry combines luxury and power, making it perfect for those who crave performance and style. With seating for up to 8, it’s ideal for a grand family road trip.",
  },
  {
    id: 6,
    brand: "Mercedes",
    rating: 5,
    carName: "Mercedes Benz XC90",
    imgUrl: img06,
    type: "SUV",
    price: 850000,
    seat: 4,
    gear: "Auto",
    fuel: "Diesel",
    address: "200 Kim Ma, Ba Dinh, Ha Noi",
    description:
      "Mercedes Benz XC90 offers an unmatched driving experience with its elegant design and advanced diesel engine. It's a luxury SUV with state-of-the-art technology and superior comfort.",
  },
  {
    id: 7,
    brand: "Audi",
    rating: 5,
    carName: "Audi Fiesta",
    imgUrl: img07,
    type: "Sport",
    price: 500000,
    seat: 6,
    gear: "Manual",
    fuel: "Gasoline",
    address: "300 Lang Ha, Dong Da, Ha Noi",
    description:
      "Audi Fiesta is a sporty vehicle with great handling and an eye-catching design. It’s perfect for those who want a fun driving experience with extra room for passengers.",
  },
  {
    id: 8,
    brand: "Colorado",
    rating: 4,
    carName: "Rolls Royce Colorado",
    imgUrl: img08,
    type: "SUV",
    price: 500000,
    seat: 4,
    gear: "Semi-Auto",
    fuel: "Gasoline",
    address: "250 Le Duan, Hoan Kiem, Ha Noi",
    description:
      "The Rolls Royce Colorado combines luxury and ruggedness, making it a standout choice for anyone who needs an SUV that offers both comfort and capability on all terrains.",
  },
];

export default carData;
