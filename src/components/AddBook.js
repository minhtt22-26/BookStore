import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import AppContext from "../provider/Context";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function AddBook() {
  const { authors, setAuthors, genres, setGenres, book, setBook } =
    useContext(AppContext);
  const navigate = useNavigate();

  // State để lưu thông tin sách
  const [newBook, setNewBook] = useState({
    title: "",
    authorId: "",
    genreId: "",
    yearPublished: "",
    description: "",
    image: "",
    price: "",
  });

  // State để lưu thông tin mới của tác giả và thể loại
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");

  // Hàm để cập nhật state khi nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm để thêm tác giả mới
  const handleAddAuthor = async () => {
    if (newAuthor) {
      try {
        const response = await axios.post("http://localhost:9999/authors", {
          name: newAuthor,
        });
        setAuthors((prev) => [...prev, response.data]); // Thêm vào state
        setNewAuthor("");
      } catch (error) {
        alert("Error adding author: " + error.message);
      }
    }
  };

  // Hàm để thêm thể loại mới
  const handleAddGenre = async () => {
    if (newGenre) {
      try {
        const response = await axios.post("http://localhost:9999/genres", {
          name: newGenre,
        });
        setGenres((prev) => [...prev, response.data]); // Thêm vào state
        setNewGenre("");
      } catch (error) {
        alert("Error adding genre: " + error.message);
      }
    }
  };

  // Hàm để xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9999/books", {
        ...newBook,
        authorId: parseInt(newBook.authorId, 10), // Chuyển đổi sang int
        genreId: parseInt(newBook.genreId, 10), // Chuyển đổi sang int
        yearPublished: parseInt(newBook.yearPublished, 10), // Chuyển đổi sang int
        price: parseFloat(newBook.price), // Chuyển đổi sang float
      });

      setBook([...book, response.data]); // Thêm sách vào state
      alert("Book added successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error adding book: " + error.message);
    }
  };

  return (
    <Container>
      <h2 className="text-center">Add New Book</h2>
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
            placeholder="Enter book title"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            as="select"
            name="authorId"
            value={newBook.authorId}
            onChange={handleChange}
            required
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
          <div className="mt-2">
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Add new author"
            />
            <Button
              variant="secondary"
              onClick={handleAddAuthor}
              className="ml-2"
            >
              Add Author
            </Button>
          </div>
        </Form.Group>

        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="genreId"
            value={newBook.genreId}
            onChange={handleChange}
            required
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Control>
          <div className="mt-2">
            <input
              type="text"
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="Add new genre"
            />
            <Button
              variant="secondary"
              onClick={handleAddGenre}
              className="ml-2"
            >
              Add Genre
            </Button>
          </div>
        </Form.Group>

        <Form.Group controlId="formYearPublished">
          <Form.Label>Year Published</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year published"
            name="yearPublished"
            value={newBook.yearPublished}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={newBook.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="image"
            value={newBook.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={newBook.price}
            onChange={handleChange}
            required
            step="0.01" // Cho phép nhập giá có thập phân
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Book
        </Button>
      </Form>
    </Container>
  );
}

export default AddBook;
