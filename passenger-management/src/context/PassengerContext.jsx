import React, { createContext, useState } from "react";

export const PassengerContext = createContext();

export const PassengerProvider = ({ children }) => {
  const [passengersData, setPassengerData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <PassengerContext.Provider
      value={{
        passengersData,
        setPassengerData,
       
      }}
    >
      {children}
    </PassengerContext.Provider>
  );
};
