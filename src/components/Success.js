import React, { useEffect } from "react";

     // Để điều hướng
import {
  Table,
  Button,
  ListGroup,
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
function Success() {
 // Khởi tạo useNavigate để điều hướng



  return (
    <Container className="text-center mt-5">
      <h1>Thanh Toán Thành Công!</h1>
      Cảm ơn bạn đã mua sắm.
      <Row>
        <Col>
          {" "}
          <Link to={`/`}>
            <Button variant="success">Về Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Success;
