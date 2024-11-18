import React, { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import ManageProducts from "./ManageProducts"; // Giả sử bạn có component này
import OrderInfo from "./OrderInfo"; // Giả sử bạn có component này
import "./Dashboard.css";
function Dashboard() {
  const [activePage, setActivePage] = useState("manageProducts");

  const renderPage = () => {
    switch (activePage) {
      case "manageProducts":
        return <ManageProducts />;
      case "orderInfo":
        return <OrderInfo />;
      default:
        return <ManageProducts />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar">
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => setActivePage("manageProducts")}
              active={activePage === "manageProducts"}
            >
              Manage Products
            </Nav.Link>
            <Nav.Link
              onClick={() => setActivePage("orderInfo")}
              active={activePage === "orderInfo"}
            >
              Order Information
            </Nav.Link>
          </Nav>
        </Col>
        <Col xs={10} className="content">
          {renderPage()}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
