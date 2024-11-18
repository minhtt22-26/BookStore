import React, { useContext, useState } from "react";
import AppContext from "../provider/Context"; // Nhập Context nếu bạn đang sử dụng
import { useNavigate } from "react-router-dom"; // Để điều hướng
import { Button, ListGroup, Container, Row, Col, Form } from "react-bootstrap";
import "./CartDetail.css"; // Nhập CSS cho component này

function CartDetail() {
  const { cart, setCart } = useContext(AppContext); // Lấy các sản phẩm trong giỏ hàng từ Context
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  // State cho số điện thoại và địa chỉ
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Hàm để xóa sản phẩm khỏi giỏ hàng nếu quantity bằng 0
  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      // Nếu số lượng nhỏ hơn 1, hỏi xác nhận trước khi xóa
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const updatedCart = cart.filter((item) => item.id !== productId); // Xóa sản phẩm
        setCart(updatedCart);
      }
    } else {
      const updatedCart = cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity }; // Cập nhật số lượng
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  // Tính toán tổng tiền
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Hàm xử lý Checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert(
        "Giỏ hàng của bạn hiện đang trống. Vui lòng thêm sản phẩm trước khi thanh toán."
      );
      return;
    }

    // Kiểm tra thông tin nhập
    if (!phone || !address) {
      alert("Vui lòng nhập số điện thoại và địa chỉ.");
      return;
    }

    const order = {
      orderDate: new Date().toISOString(),
      totalAmount,
      status: "Pending",
      items: cart.map((item) => ({
        bookId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        
      })),
      phone,
      address,
    };

    console.log("Order submitted: ", order);

    // Gửi yêu cầu POST đến server
    try {
      const response = await fetch("http://localhost:9999/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Xóa giỏ hàng sau khi thanh toán thành công
      setCart([]);
      navigate("/success");
    } catch (error) {
      console.error("Error submitting order: ", error);
      alert("Đã xảy ra lỗi khi gửi đơn hàng. Vui lòng thử lại.");
    }
  };

  // Hàm để xóa toàn bộ giỏ hàng
  const handleRemoveAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      setCart([]); // Xóa toàn bộ giỏ hàng
    }
  };

  return (
    <Container className="cart-detail-container">
      <h2 className="text-center mt-4">Cart Details</h2>
      <Row className="mt-4">
        <Col>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => navigate("/")}>
                Return Home
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                variant="danger"
                className="ml-2"
                onClick={handleRemoveAll}
              >
                Remove All
              </Button>
            </Col>
          </Row>
          {cart.length === 0 ? (
            <h3 className="text-center">Your cart is empty</h3>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item
                  key={item.id} // Sử dụng id của sản phẩm làm key
                  className="d-flex justify-content-between align-items-center mt-3 cart-item"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.image} // Hiển thị hình ảnh sản phẩm
                      alt={item.title}
                      className="cart-item-image" // CSS cho hình ảnh
                    />
                    <div>
                      <h5>
                        {item.title} (#{index + 1})
                      </h5>
                      <p>
                        Price:{" "}
                        {item.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          min="0"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="quantity-input" // CSS cho input
                        />
                      </div>
                      <p>
                        Total:{" "}
                        {(item.price * item.quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      {/* Hiển thị tổng tiền ở trên form nhập số điện thoại và địa chỉ */}
      {cart.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h4 className="text-right">
              Total Amount:{" "}
              {totalAmount.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h4>
          </Col>
        </Row>
      )}
      {/* Thêm form nhập số điện thoại và địa chỉ */}
      <Row className="mt-4">
        <Col>
          <Form>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {/* Thêm nút Checkout */}
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CartDetail;
