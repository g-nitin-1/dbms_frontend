import React, {useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
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

function InterviewList() {
  const location = useLocation();
  const data = location.state;
  const [interviewList, setInterviewList] = useState(data.data);

  console.log(data.data);
  const handlesubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = formData.get("user_id");
    try {
      const response = await fetch("http://localhost:3000/c/offeredjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({APP_ID : userId}),
      });

      if (!response.ok) {
        throw new Error("Failed to Apply");
      }
      event.target.reset();
    } catch (error) {
      console.error("Error Applying", error);
    }
    let newList = interviewList.filter((student)=>{
      return student.APP_ID != userId ;
    });
    
    setInterviewList(newList);
  };
  const handlesubmit1 = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = formData.get("user_id");

    try {
      console.log("false");
      const response = await fetch("http://localhost:3000/c/rejected", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({APP_ID : userId}),
      });

      if (!response.ok) {
        throw new Error("Failed to Apply");
      }
      event.target.reset();
      // // Optionally, you can fetch data again after updating
      // fetchData();

    } catch (error) {
      console.error("Error Applying", error);
    }

    let newList = interviewList.filter((student)=>{
      return student.APP_ID != userId ;
    });
    
    setInterviewList(newList);
  };
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
                      {data.fields.map((value, index) => (
                        <th className="border-0" key={index}>
                          {value}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.data && (interviewList.map((item) => (
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
                        {true && (
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
                        {true && (
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

export default InterviewList;
