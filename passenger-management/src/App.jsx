import React, { useState, useEffect, useContext } from "react";
import PassengerForm from "./components/PassengerForm";
import PassengerTable from "./components/PassengerTable";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { PassengerContext } from "./context/PassengerContext";

function App() {
  const { passengersData, setPassengerData } = useContext(PassengerContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/passengers");
      const data = response.data.data;
      setPassengerData(data);
    };
    fetchData();
  }, []);
  const handlePassengerSubmit = (newPassengers) => {
    setPassengerData(newPassengers);
  };

  return (
    <div className="container mt-5">
      <h1>Passenger Management</h1>
      <PassengerForm onPassengerSubmit={handlePassengerSubmit} />
      <PassengerTable passengers={passengersData} />
    </div>
  );
}

export default App;
