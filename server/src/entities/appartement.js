module.exports.Appartemant = class Appartemant {
  constructor({
    id = null,
    number = null,
    price = null,
    status = false,
    city = null,
    address = null,
    surface = null,
    rooms = null,
    bedrooms = null,
    parking = null,
    garden = null,
    user = null,
  }) {
    this.id = id;
    this.number = number;
    this.price = price;
    this.status = status;
    this.city = city;
    this.address = address;
    this.surface = surface;
    this.rooms = rooms;
    this.bedrooms = bedrooms;
    this.parking = parking;
    this.garden = garden;
    this.user = user;
  }
};
