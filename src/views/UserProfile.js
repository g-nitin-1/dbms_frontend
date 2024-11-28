import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

// Define an array of objects to represent form fields
const formFields = [
  {
    label: "Company (disabled)",
    name: "company",
    placeholder: "Company",
    type: "text",
    disabled: true,
    defaultValue: "Creative Code Inc."
  },
  {
    label: "Username",
    name: "username",
    placeholder: "Username",
    type: "text",
    defaultValue: "michael23"
  },
  {
    label: "Email address",
    name: "email",
    placeholder: "Email",
    type: "email",
    defaultValue: "michael23@example.com"
  },
  {
    label: "First Name",
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    defaultValue: "Mike"
  },
  {
    label: "Last Name",
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    defaultValue: "Andrew"
  },
  {
    label: "Address",
    name: "address",
    placeholder: "Home Address",
    type: "text",
    defaultValue: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
  },
  {
    label: "City",
    name: "city",
    placeholder: "City",
    type: "text",
    defaultValue: "Mike"
  },
  {
    label: "Country",
    name: "country",
    placeholder: "Country",
    type: "text",
    defaultValue: "Andrew"
  },
  {
    label: "Postal Code",
    name: "postalCode",
    placeholder: "ZIP Code",
    type: "number"
  },
  {
    label: "About Me",
    name: "aboutMe",
    placeholder: "Here can be your description",
    type: "textarea",
    rows: 4,
    defaultValue: "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
  }
];

function User() {
  // Create state for form data
  const [formData, setFormData] = useState({});

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Render form fields dynamically
  const renderFormFields = () => {
    return formFields.map((field, index) => (
      <Col key={index} md={field.type === 'textarea' ? '12' : '6'}>
        <Form.Group>
          <label>{field.label}</label>
          <Form.Control
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            disabled={field.disabled}
            defaultValue={field.defaultValue}
            rows={field.rows}
            onChange={handleInputChange}
            as={field.type === 'textarea' ? 'textarea' : 'input'}
          ></Form.Control>
        </Form.Group>
      </Col>
    ));
  };

  return renderFormFields;
}

export default User;


// import React from "react";

// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Form,
//   Navbar,
//   Nav,
//   Container,
//   Row,
//   Col
// } from "react-bootstrap";

// function User() {
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="8">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Edit Profile</Card.Title>
//               </Card.Header>
//               <Card.Body>
//                 <Form>
//                   <Row>
//                     <Col className="pr-1" md="5">
//                       <Form.Group>
//                         <label>Company (disabled)</label>
//                         <Form.Control
//                           defaultValue="Creative Code Inc."
//                           disabled
//                           placeholder="Company"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="px-1" md="3">
//                       <Form.Group>
//                         <label>Username</label>
//                         <Form.Control
//                           defaultValue="michael23"
//                           placeholder="Username"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="4">
//                       <Form.Group>
//                         <label htmlFor="exampleInputEmail1">
//                           Email address
//                         </label>
//                         <Form.Control
//                           placeholder="Email"
//                           type="email"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-1" md="6">
//                       <Form.Group>
//                         <label>First Name</label>
//                         <Form.Control
//                           defaultValue="Mike"
//                           placeholder="Company"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="6">
//                       <Form.Group>
//                         <label>Last Name</label>
//                         <Form.Control
//                           defaultValue="Andrew"
//                           placeholder="Last Name"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md="12">
//                       <Form.Group>
//                         <label>Address</label>
//                         <Form.Control
//                           defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
//                           placeholder="Home Address"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col className="pr-1" md="4">
//                       <Form.Group>
//                         <label>City</label>
//                         <Form.Control
//                           defaultValue="Mike"
//                           placeholder="City"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="px-1" md="4">
//                       <Form.Group>
//                         <label>Country</label>
//                         <Form.Control
//                           defaultValue="Andrew"
//                           placeholder="Country"
//                           type="text"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                     <Col className="pl-1" md="4">
//                       <Form.Group>
//                         <label>Postal Code</label>
//                         <Form.Control
//                           placeholder="ZIP Code"
//                           type="number"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md="12">
//                       <Form.Group>
//                         <label>About Me</label>
//                         <Form.Control
//                           cols="80"
//                           defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
//                           that two seat Lambo."
//                           placeholder="Here can be your description"
//                           rows="4"
//                           as="textarea"
//                         ></Form.Control>
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Button
//                     className="btn-fill pull-right"
//                     type="submit"
//                     variant="info"
//                   >
//                     Update Profile
//                   </Button>
//                   <div className="clearfix"></div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md="4">
//             <Card className="card-user">
//               <div className="card-image">
//                 <img
//                   alt="..."
//                   src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
//                 ></img>
//               </div>
//               <Card.Body>
//                 <div className="author">
//                   <a href="#pablo" onClick={(e) => e.preventDefault()}>
//                     <img
//                       alt="..."
//                       className="avatar border-gray"
//                       src={require("assets/img/faces/face-3.jpg")}
//                     ></img>
//                     <h5 className="title">Mike Andrew</h5>
//                   </a>
//                   <p className="description">michael24</p>
//                 </div>
//                 <p className="description text-center">
//                   "Lamborghini Mercy <br></br>
//                   Your chick she so thirsty <br></br>
//                   I'm in that two seat Lambo"
//                 </p>
//               </Card.Body>
//               <hr></hr>
//               <div className="button-container mr-auto ml-auto">
//                 <Button
//                   className="btn-simple btn-icon"
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                   variant="link"
//                 >
//                   <i className="fab fa-facebook-square"></i>
//                 </Button>
//                 <Button
//                   className="btn-simple btn-icon"
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                   variant="link"
//                 >
//                   <i className="fab fa-twitter"></i>
//                 </Button>
//                 <Button
//                   className="btn-simple btn-icon"
//                   href="#pablo"
//                   onClick={(e) => e.preventDefault()}
//                   variant="link"
//                 >
//                   <i className="fab fa-google-plus-square"></i>
//                 </Button>
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default User;
