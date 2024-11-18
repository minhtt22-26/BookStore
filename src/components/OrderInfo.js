import React, { useContext, useState } from "react";
import AppContext from "../provider/Context"; // Nhập Context nếu bạn đang sử dụng
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  Modal,
} from "react-bootstrap";

function OrderInfo() {
  const { orders, setOrders } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đang được chọn để hiển thị

  const handleShow = (order) => {
    setSelectedOrder(order); // Cập nhật đơn hàng được chọn
    setShowModal(true); // Mở modal
  };

  const handleClose = () => {
    setShowModal(false); // Đóng modal
    setSelectedOrder(null); // Đặt lại đơn hàng được chọn
  };

  const handleChangeStatus = async (orderId) => {
    // Gửi yêu cầu cập nhật trạng thái đơn hàng
    try {
      const response = await fetch(`http://localhost:9999/orders/${orderId}`, {
        method: "PUT", // Hoặc "PATCH" tùy theo API của bạn
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }), // Cập nhật trạng thái
      });

      if (response.ok) {
        // Cập nhật trạng thái đơn hàng trong state
        setOrders(orders.map((o)=>(
          o.id == orderId ? {...o,status:"Complete"} : o
        ))
         
          )
        
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
      alert(
        "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng. Vui lòng thử lại."
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Order Information</h1>
        </Col>
      </Row>
      {orders.length > 0 ? (
        <Table striped className="table table-hover">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>
                  {o.orderDate ? new Date(o.orderDate).toLocaleString() : "N/A"}
                </td>
                <td>
                  {o.totalAmount
                    ? o.totalAmount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : "N/A"}
                </td>
                <td>
                  {o.status == "Pending" ? (
                    <span style={{ color: "red" }}>Pending</span>
                  ) : (
                    <span style={{ color: "green" }}>Completed</span>
                  )}
                </td>
                <td>
                  <Button
                    className="mx-3"
                    variant="primary"
                    onClick={() => handleShow(o)} // Mở modal với đơn hàng hiện tại
                  >
                    Detail
                  </Button>
                  {/* Ẩn nút Change Status nếu trạng thái là Completed */}
                  {o.status !== "Completed" && (
                    <Button
                      variant="success"
                      onClick={() => handleChangeStatus(o.id)}
                    >
                      Change Status
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No order found.</p>
      )}

      {/* Modal hiển thị chi tiết đơn hàng */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && selectedOrder.items && (
            <>
              <h5>Items in Order</h5>
              <ListGroup>
                {selectedOrder.items.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex align-items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }} // Kích thước ảnh
                    />
                    <div>
                      <strong>Book ID:</strong> {item.bookId},
                      <strong>Book Name:</strong> {item.name},
                      <strong> Quantity:</strong> {item.quantity},
                      <strong> Price:</strong>{" "}
                      {item.price
                        ? item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "N/A"}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrderInfo;
