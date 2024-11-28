import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';

function PostUpdate() {

  const [formData, setFormData] = useState({
    TITLE: '',
    CONTENT: '',
    LINK: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/a/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to post update');
      }

      setFormData({
        TITLE: '',
        CONTENT: '',
        LINK: '',
      });

      alert('Posted successfully');

    } catch (error) {
      console.error('Error posting update:', error);
      alert('Failed to post update');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="8">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Post Updates</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Title</label>
                      <Form.Control
                        name="TITLE"
                        value={formData.TITLE}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Enter title"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Content</label>
                      <Form.Control
                        name="CONTENT"
                        value={formData.CONTENT}
                        onChange={handleInputChange}
                        type="textarea"
                        placeholder="Enter content"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <Form.Group>
                      <label>Link</label>
                      <Form.Control
                        name="LINK"
                        value={formData.LINK}
                        onChange={handleInputChange}
                        type="url"
                        placeholder="Enter link (optional)"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="btn-fill pull-right mt-3"
                  type="submit"
                  variant="info"
                >
                  Submit Update
                </Button>
                <div className="clearfix"></div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PostUpdate;

