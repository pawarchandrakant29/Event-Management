import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Card, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from "axios";
import "./SwiperComponent.css";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { API_URL } from "./api";

const SwiperComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/events/all`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const navigate = useNavigate();
  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/events/delete/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    alert("You have been logged out.");
  };

  return (
    <section>
      {/* Navigation Bar */}
      <header>
        <Navbar expand="lg" className="eventbrite-navbar bg-dark text-white">
          <Container>
            <Navbar.Brand
              href="/"
              className="brand-logo d-flex align-items-center"
            >
              <h2 className="text-light font-weight-bold">Event Management</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex align-items-center">
                <Nav.Link href="/" className="nav-item text-light mx-3">
                  <strong></strong>
                </Nav.Link>
                <Nav.Link href="/" className="nav-item text-light mx-3">
                  <strong></strong>
                </Nav.Link>
                <Nav.Link href="/" className="nav-item text-light mx-3">
                  <strong></strong>
                </Nav.Link>
              </Nav>
              <div className="d-flex align-items-center gap-3">
                <Nav.Link
                  href="/AddForm"
                  className="signup-btn btn btn-outline-success px-4 py-2 text-white"
                >
                  <strong>+ Add New Event</strong>
                </Nav.Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger px-4 py-2"
                >
                  <strong>Logout</strong>
                </button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Event Cards Section */}
      <Container className="my-5">
        <div className="row d-flex justify-content-center">
          {events.map((event) => (
            <div className="col-md-4 col-12 mb-4" key={event._id}>
              <Card className="event-card">
                <Card.Img
                  variant="top"
                  src={event.eventImage}
                  alt={event.eventName}
                  className="event-card-img"
                />
                <Card.Body>
                  <Card.Title>{event.eventName}</Card.Title>
                  <Card.Text>{event.eventDescription}</Card.Text>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="outline-success"
                      onClick={() => handleShow(event)}
                    >
                      <FaEye />
                    </Button>
                    <Link to={`/editForm/${event._id}`}>
                      <Button className="ms-2" variant="outline-primary">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      className="ms-2"
                      variant="outline-danger"
                      onClick={() => handleDelete(event._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      {/* Event Detail Modal */}
      <Modal show={showModal} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.eventName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedEvent?.eventImage}
            alt={selectedEvent?.eventName}
            className="img-fluid mb-3"
          />
          <p>
            <strong>Date:</strong>{" "}
            {new Date(selectedEvent?.eventDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {selectedEvent?.eventTime}
          </p>
          <p>
            <strong>Description:</strong> {selectedEvent?.eventDescription}
          </p>
          <p>
            <strong>Location:</strong> {selectedEvent?.eventLocation}
          </p>
          <p>
            <strong>Attendees:</strong> {selectedEvent?.eventAttendees}
          </p>
          <p>
            <strong>Facilities:</strong> {selectedEvent?.eventFacilities}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default SwiperComponent;
