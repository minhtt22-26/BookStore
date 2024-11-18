import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppContext from "../provider/Context";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function UpdateBook() {
  const { id } = useParams(); // Lấy ID từ URL
  const { authors, genres, book, setBook } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    genreId: "",
    price: "", // Giữ nguyên là chuỗi để dễ dàng xử lý input
    description: "",
    image: "",
  });

  useEffect(() => {
    // Tìm sách theo ID và thiết lập dữ liệu ban đầu cho form
    const bookToUpdate = book.find((b) => b.id === parseInt(id));
    if (bookToUpdate) {
      setFormData({
        title: bookToUpdate.title,
        authorId: bookToUpdate.authorId,
        genreId: bookToUpdate.genreId,
        price: bookToUpdate.price.toString(), // Chuyển thành chuỗi để dễ dàng hiển thị
        description: bookToUpdate.description,
        image: bookToUpdate.image,
      });
    }
  }, [id, book]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert `price` to float, and `authorId` & `genreId` to integers
    if (name === "price") {
      setFormData({ ...formData, [name]: parseFloat(value) }); // For price
    } else if (name === "authorId" || name === "genreId") {
      setFormData({ ...formData, [name]: parseInt(value, 10) }); // For authorId and genreId
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookData = { ...formData, id: parseInt(id) }; // Thêm ID vào dữ liệu

    try {
      // Gửi yêu cầu cập nhật đến server
      const response = await fetch(`http://localhost:9999/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBookData), // Chuyển đổi dữ liệu thành JSON
      });

      if (response.ok) {
        const updatedBook = await response.json(); // Lấy dữ liệu sách đã cập nhật từ server
        const updatedBooks = book.map((b) =>
          b.id === parseInt(id) ? updatedBook : b
        );

        setBook(updatedBooks); // Cập nhật trạng thái local
        navigate("/dashboard"); // Chuyển hướng về trang chính
      } else {
        // Xử lý lỗi nếu có
        const errorData = await response.json();
        console.error("Error updating book:", errorData);
        alert("Failed to update book: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("An error occurred while updating the book.");
    }
  };

  return (
    <Container>
      <h2>Update Book</h2>
      <Row>
        <Col>
          <Link to={`/dashboard`}>
            <Button variant="primary">Back to dashboard</Button>
          </Link>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Dropdown cho tác giả */}
        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Dropdown cho thể loại */}
        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genreId"
            value={formData.genreId}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01" // Cho phép nhập số thực
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Book
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateBook;
