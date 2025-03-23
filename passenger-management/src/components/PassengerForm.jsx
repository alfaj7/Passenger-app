import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

const PassengerForm = ({ onPassengerSubmit }) => {
  const [passengers, setPassengers] = useState([
    {
      name: "",
      age: "",
      gender: "",
      contact: "",
      email: "",
      photo: null,
      idCard: null,
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = value;
    setPassengers(newPassengers);
  };

  const handleFileChange = (index, e) => {
    const { name, files } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index][name] = files[0];
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        name: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        photo: null,
        idCard: null,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    passengers.forEach((passenger, index) => {
      formData.append(`passengers[${index}][name]`, passenger.name);
      formData.append(`passengers[${index}][age]`, passenger.age);
      formData.append(`passengers[${index}][gender]`, passenger.gender);
      formData.append(`passengers[${index}][contact]`, passenger.contact);
      formData.append(`passengers[${index}][email]`, passenger.email);

      if (passenger.photo) {
        formData.append(`photo`, passenger.photo);
      }
      if (passenger.idCard) {
        formData.append(`idCard`, passenger.idCard);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/passengers",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Passengers added successfully!");
      onPassengerSubmit(response.data.data);
      setPassengers([
        {
          name: "",
          age: "",
          gender: "",
          contact: "",
          email: "",
          photo: null,
          idCard: null,
        },
      ]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        {/* Header Row */}
        <Row
          style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px",
          }}
        >
          <Col>
            <strong>Sl No.</strong>
          </Col>
          <Col>
            <strong>Passenger</strong>
          </Col>
          <Col>
            <strong>Age</strong>
          </Col>
          <Col>
            <strong>Gender</strong>
          </Col>
          <Col>
            <strong>Contact No.</strong>
          </Col>
          <Col>
            <strong>Email Address</strong>
          </Col>
          <Col>
            <strong>Photo</strong>
          </Col>
          <Col>
            <strong>ID Card</strong>
          </Col>
        </Row>

        {/* Passenger Rows */}
        {passengers.map((passenger, index) => (
          <Row
            key={index}
            style={{ marginBottom: "15px", alignItems: "center" }}
          >
            <Col>
              <span>{index + 1}</span>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={passenger.name}
                onChange={(e) => handleInputChange(index, e)}
                required
                style={{ borderRadius: "5px" }}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                name="age"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) => handleInputChange(index, e)}
                required
                style={{ borderRadius: "5px" }}
              />
            </Col>
            <Col>
              <Form.Select
                name="gender"
                value={passenger.gender}
                onChange={(e) => handleInputChange(index, e)}
                required
                style={{ borderRadius: "5px" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="contact"
                placeholder="Contact"
                value={passenger.contact}
                onChange={(e) => handleInputChange(index, e)}
                style={{ borderRadius: "5px" }}
              />
            </Col>
            <Col>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={passenger.email}
                onChange={(e) => handleInputChange(index, e)}
                style={{ borderRadius: "5px" }}
              />
            </Col>
            <Col>
              <Form.Control
                type="file"
                name="photo"
                accept="image/png"
                onChange={(e) => handleFileChange(index, e)}
                style={{ borderRadius: "5px" }}
              />
            </Col>
            <Col>
              <Form.Control
                type="file"
                name="idCard"
                accept="application/pdf"
                onChange={(e) => handleFileChange(index, e)}
                style={{ borderRadius: "5px" }}
              />
            </Col>
          </Row>
        ))}

        {/* Buttons */}
        <Row>
          <Col>
            <Button
              type="button"
              onClick={addPassenger}
              style={{
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                marginRight: "10px",
              }}
            >
              Add Passenger
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PassengerForm;
