import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import {
  // react-bootstrap components
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
function StudentsList() {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handlesubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const appId = formData.get("user_id");

      try {
        const response = await fetch("http://localhost:3000/s/offeraccepted", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({APP_ID : appId}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to Apply");
        }
        event.target.reset();

        // Optionally, you can fetch data again after updating
        fetchData();

      } catch (error) {
        console.error("Error Applying", error);
      }

    };
    const handlesubmit1 = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const appId = formData.get("user_id");
  
      try {
        console.log("false");
        const response = await fetch("http://localhost:3000/s/offerrejected", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({APP_ID : appId}),
        });
  
        if (!response.ok) {
          throw new Error("Failed to Apply");
        }
        event.target.reset();
        // Optionally, you can fetch data again after updating
        fetchData();
  
      } catch (error) {
        console.error("Error Applying", error);
      }
  
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/s/offers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response, "here");
            return response;
          })
          .catch((err) => console.log("Fetch Error: ", err));
        console.log("Hi..");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        console.log("jsondatda:", jsonData);
        setData(jsonData.rows); // Accessing the 'rows' array in the response
        setFields(jsonData.fields); // Accessing the 'fields' array in the response
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{"stdudents list"}</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {fields.map((value, index) => (
                        <th className="border-0" key={index}>
                          {value}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data && (data.map((item) => (
                      <tr key={item.id}>
                        {Object.values(item).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                        {false && (
                          <td>
                            <form onSubmit={handlesubmit}>
                              <input type="hidden" name="user_id" value={item.APP_ID}></input>
                              <input type="submit" value={"accept"} style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  fontSize: "16px",
                                  backgroundColor: "#007bff",
                                  color: "#ffffff",
                                  border: "none", 
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}/>
                            </form>
                          </td>
                        )}
                        {(item.APP_STATUS == 'offered') && (
                          <td>
                            <form onSubmit={handlesubmit}>
                              <input type="hidden" name="user_id" value={item.APP_ID}></input>
                              <input type="submit" value={"accept"} style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  fontSize: "16px",
                                  backgroundColor: "#007bff",
                                  color: "#ffffff",
                                  border: "none", 
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}/>
                            </form>
                          </td>
                        )}
                        {(item.APP_STATUS == 'offered') && (
                          <td>
                            <form onSubmit={handlesubmit1}>
                              <input type="hidden" name="user_id" value={item.APP_ID}></input>
                              <input type="submit" value={"reject"} style={{
                                  width: "100%",
                                  padding: "8px 12px",
                                  fontSize: "16px",
                                  backgroundColor: "#FF0000",
                                  color: "#ffffff",
                                  border: "none", 
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                }}/>
                            </form>
                          </td>
                        )}
                      </tr>
                    )))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default StudentsList;