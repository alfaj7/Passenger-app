const express = require("express");
const mongoose = require("mongoose");
// const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/passengers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Passenger Schema
const passengerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  email: String,
  photo: String,
  idCard: String,
});
const Passenger = mongoose.model("Passenger", passengerSchema);
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extention = file.originalname.split(".").pop();
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "." + extention;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
const cpUpload = upload.fields([
  { name: "photo", maxCount: 10 },
  { name: "idCard", maxCount: 10 },
]);

let passengers = [];

app.post("/api/passengers", cpUpload, async (req, res) => {
  const passengers = req.body.passengers;
  let allPassengers = passengers.map((n, index) => {
    //  console.log(req.files["photo"]);
    const photo = req.files["photo"]
      ? req.files["photo"][index].filename
      : null;
    const idCard = req.files["idCard"]
      ? req.files["idCard"][index].filename
      : null;
    return {
      name: n.name,
      age: n.age,
      gender: n.gender,
      contact: n.contact,
      email: n.email,
      photo: photo ? `/uploads/${photo}` : null,
      idCard: idCard ? `/uploads/${idCard}` : null,
    };
  });

  const newPassengers = await Passenger.insertMany(allPassengers);
  const allPassengersData = await Passenger.find();

  return res.json({
    status: "success",
    message: "Passenger added successfully",
    data: allPassengersData,
  });
});

app.get("/api/passengers", async (req, res) => {
  const allPassengersData = await Passenger.find();

  return res.json({
    status: "success",
    message: "Passenger fetched successfully",
    data: allPassengersData,
  });
});
app.delete("/api/passengers/:id", async (req, res) => {
  const { id } = req.params;

  const passenger1 = await Passenger.findOne({ _id: id });

  const deletePassenger = await Passenger.deleteOne({ _id: id });

  const filePath = path.join(__dirname, passenger1.photo);
  const filePathIDCard = path.join(__dirname, passenger1.idCard);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  fs.unlink(filePathIDCard, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
  const allPassengersData = await Passenger.find();

  return res.json({
    status: "success",
    message: "Passenger deleted successfully",
    data: allPassengersData,
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
