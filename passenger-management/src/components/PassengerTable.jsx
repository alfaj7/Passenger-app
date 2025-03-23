import React, { useContext, useState } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { PassengerContext } from "../context/PassengerContext";

const PassengerTable = ({ passengers }) => {
  const { setPassengerData } = useContext(PassengerContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle delete passenger
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/passengers/${id}`
    );
    const data = response.data.data;
    setPassengerData(data);
  };

  // Filter passengers based on search query
  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      {/* Search Container */}
      <Row className="mb-4">
        <Col>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by Name or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "20px",
                padding: "10px 20px",
                border: "1px solid #007bff",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Passenger Table */}
      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover responsive style={{ marginTop: "20px" }}>
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Photo</th>
              <th>ID Card</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPassengers.map((passenger, index) => (
              <tr key={index}>
                <td>{passenger.name}</td>
                <td>{passenger.age}</td>
                <td>{passenger.gender}</td>
                <td>{passenger.contact}</td>
                <td>{passenger.email}</td>
                <td>
                  <img
                    src={`http://localhost:5000${passenger.photo}`}
                    alt="Passenger"
                    style={{ width: "50px", borderRadius: "5px" }}
                  />
                </td>
                <td>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`http://localhost:5000${passenger.idCard}`}
                    download
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    Download
                  </a>
                </td>
                <td>
                  <Button
                    onClick={() => handleDelete(passenger._id)}
                    variant="danger"
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PassengerTable;