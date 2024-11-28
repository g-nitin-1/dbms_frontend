import React from "react";
import PropTypes from "prop-types";
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

function TableList({ data, fields, heading, apply = false, approve= false, reject=false, val1, val,handlesubmit, handlesubmit1}) {

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">{heading}</Card.Title>
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
                        {apply && (
                          <td>
                            <form onSubmit={handlesubmit}>
                              <input type="hidden" name="user_id" value={item.ID}></input>
                              <input type="submit" value={val} style={{
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
                        {approve && (
                          <td>
                            <form onSubmit={handlesubmit}>
                              <input type="hidden" name="user_id" value={item.ID}></input>
                              <input type="submit" value={val} style={{
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
                        {reject && (
                          <td>
                            <form onSubmit={handlesubmit1}>
                              <input type="hidden" name="user_id" value={item.ID}></input>
                              <input type="submit" value={val1} style={{
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

TableList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TableList;
