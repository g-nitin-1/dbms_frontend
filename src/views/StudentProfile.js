import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function StudentProfile() {
  // State to hold form data
  const [formData, setFormData] = useState({
    SROLL: "",
    SNAME: "",
    CGPA: "",
    EMAIL: "",
    GENDER: "",
    ANY_ARREARS: "",
    RESUME: "",
    GITHUB: "",
    LINKEDIN: "",
    ABOUT: "",
  });

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/s/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
            
      // Parse the JSON response
      const data = await response.json();

      // Update the form data state with the fetched data
      setFormData({
        SROLL: data.SROLL || "",
        SNAME: data.SNAME || "",
        CGPA: data.CGPA || "",
        EMAIL: data.EMAIL || "",
        GENDER: data.GENDER || "",
        ANY_ARREARS: data.ANY_ARREARS || "",
        RESUME: data.RESUME || "",
        GITHUB: data.GITHUB || "",
        LINKEDIN: data.LINKEDIN || "",
        ABOUT: data.ABOUT || "",
      });

      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission and send POST request to API
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/s/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Optionally, you can fetch data again after updating
      fetchData();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">My Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          name="SNAME"
                          value={formData.SNAME}
                          placeholder="First Name"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Roll Number</label>
                        <Form.Control
                          name="SROLL"
                          value={formData.SROLL}
                          placeholder="Roll No"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>CGPA</label>
                        <Form.Control
                          name="CGPA"
                          value={formData.CGPA}
                          placeholder="CGPA"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Email Address</label>
                        <Form.Control
                          name="EMAIL"
                          value={formData.EMAIL}
                          placeholder="Email"
                          type="email"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Gender</label>
                        <Form.Control
                          name="GENDER"
                          value={formData.GENDER}
                          placeholder="Gender"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Active Backlogs</label>
                        <Form.Control
                          name="ANY_ARREARS"
                          value={formData.ANY_ARREARS}
                          placeholder="Active Backlogs"
                          type="text"
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Resume Link</label>
                        <Form.Control
                          name="RESUME"
                          value={formData.RESUME}
                          placeholder="Resume Link"
                          type="text"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>GitHub Link</label>
                        <Form.Control
                          name="GITHUB"
                          value={formData.GITHUB}
                          placeholder="GitHub Link"
                          type="text"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>LinkedIn Link</label>
                        <Form.Control
                          name="LINKEDIN"
                          value={formData.LINKEDIN}
                          placeholder="LinkedIn Link"
                          type="text"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          name="ABOUT"
                          value={formData.ABOUT}
                          placeholder="About Me"
                          type="textarea"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentProfile;
