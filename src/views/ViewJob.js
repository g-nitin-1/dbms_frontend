import React, { useState, useEffect } from "react";
import {useLocation, useHistory} from "react-router-dom";
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col
  } from "react-bootstrap";
import TableList from "./TableList";

function StudentsList() {
 
  const location = useLocation();
  const history = useHistory();
  const data1 = location.state;
  //console.log("data1 is:",data1.JID);
  const [formData, setFormData] = useState({
    JID:data1.JID,
    INTERVIEW_DATE: "",
    INTERVIEW_TIME: ""
  });

  
const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      //console.log("data sending jid is: ",data1.JID)
        const response = await fetch("http://localhost:3000/c/studentslist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({JID:data1.JID}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
  
        const jsonData = await response.json();
        //console.log(jsonData);
        history.push({
            pathname: '/c/studentslist',
            state: {fields: jsonData.fields, data: jsonData.rows},
          });
      } catch (error) {
        //console.error("Error updating profile:", error);
      }
}

const handleSubmit1 = async (e) =>{
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/c/interviewlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({JID:data1.JID}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
  
        const jsonData = await response.json();
        console.log(jsonData);
        history.push({
            pathname: '/c/interviewlist',
            state: {fields: jsonData.fields, data: jsonData.rows},
          });
      } catch (error) {
        console.error("Error:", error);
      }
}

const handleSubmit2 = async (e) =>{
    e.preventDefault();
    // console.log(data1);
    try {
        const response = await fetch("http://localhost:3000/c/offerlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({JID:data1.JID}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to update profile");
        }
  
        const jsonData = await response.json();
        //console.log(jsonData);
        history.push({
            pathname: '/c/offerlist',
            state: {fields: jsonData.fields, data: jsonData.rows},
          });
      } catch (error) {
        //console.error("Error updating profile:", error);
      }
}

  // Function to fetch data from the API
  const fetchData = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/c/interviewdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({JID:data1.JID}),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
            
      // Parse the JSON response
      const data = await response.json();

      // Update the form data state with the fetched data
      setFormData({
        JID:data1.JID||"",
        INTERVIEW_DATE: data.INTERVIEW_DATE||"",
        INTERVIEW_TIME: data.INTERVIEW_TIME||"",
      });

      //console.log("Fetched data:", data);
    } catch (error) {
      //console.error("Error fetching data:", error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    event.preventDefault();
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
      console.log("data is sending1: " ,formData)
      const response = await fetch("http://localhost:3000/c/updateinterviewdetails", {
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
    } catch (error) {
      //console.error("Error updating profile:", error);
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
                        <label>Interview date</label>
                        <Form.Control
                          name="INTERVIEW_DATE"
                          value={formData.INTERVIEW_DATE}
                          placeholder=""
                          type="date"
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Interview time</label>
                        <Form.Control
                          name="INTERVIEW_TIME"
                          value={formData.INTERVIEW_TIME}
                          placeholder=""
                          type="time"
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
                    Update details
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <br></br>
                <div>
                <td>
                <form onSubmit={handleSubmit}>
                    <input
                    type="hidden"
                    name="user_id"
                    value={data1.JID}
                    />
                    <input
                    type="submit"
                    value="Applied students"
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    />
                </form>
                </td>
                <td>
                <form onSubmit={handleSubmit1}>
                    <input
                    type="hidden"
                    name="user_id"
                    value={data1.JID}
                    />
                    <input
                    type="submit"
                    value="Interview Students"
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    />
                </form>
                </td>
                <td>
                <form onSubmit={handleSubmit2}>
                    <input
                    type="hidden"
                    name="user_id"
                    value={data1.JID}
                    />
                    <input
                    type="submit"
                    value="Offer Students"
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        fontSize: "16px",
                        backgroundColor: "#007bff",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    />
                </form>
                </td>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    </>
  );
}


export default StudentsList;