import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  InputGroup,
  Modal,
} from "react-bootstrap";
import AppContext from "../provider/Context";
import "./Home.css"; // Nhập CSS
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
function Home() {
  const { authors, genres, book, cart, setCart } = useContext(AppContext);
  const [searchName, setSearchName] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (book) => {
    setSelectedBook(book);
    setShow(true);
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "N/A"; // or some default value
    }
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleAddToCart = (book) => {
    const productIndex = cart.findIndex((e) => book.id === e.id);
    let updatedCart;

    if (productIndex === -1) {
      let newProduct = { ...book, quantity: 1 };
      updatedCart = [...cart, newProduct];
    } else {
      updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
    }
    alert("Your product has been added to the cart!");
    setCart(updatedCart);
 
  };

  const filteredBooks = book.filter((b) => {
    const matchesAuthor = selectedAuthor ? b.authorId === selectedAuthor : true;
    const matchesGenre = selectedGenre ? b.genreId === selectedGenre : true;
    const matchesSearch = b.title
      .toLowerCase()
      .includes(searchName.toLowerCase());
    return matchesAuthor && matchesGenre && matchesSearch;
  });

  const handleViewAll = () => {
    setSearchName("");
    setSelectedAuthor(null);
    setSelectedGenre(null);
  };




   

  return (
    <Container>
      <Row>
  
        <Col className="text-end">
          <Button
            variant="link"
            onClick={() => navigate("/cart")}
            className="cart-button"
          >
            <i className="fas fa-shopping-cart fa-lg"></i>{" "}
            {/* Font Awesome cart icon */}
            <span className="cart-count">{cart.length}</span>{" "}
            {/* Display cart count */}
          </Button>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center">
          <h2 className="book-store-title">Book Store</h2>

          <InputGroup className="search-input">
            <Form.Control
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Enter book name to search..."
              aria-label="Search books"
            />
            <Button variant="primary">Search</Button>
          </InputGroup>
          <Button variant="secondary" className="mt-3" onClick={handleViewAll}>
            View All
          </Button>

         
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <h4 className="author-genre-header">Authors</h4>
          {authors.map((a) => (
            <Form.Check
              key={a.id}
              type="radio"
              id={`author-${a.id}`}
              label={a.name}
              name="author"
              checked={selectedAuthor === a.id}
              onChange={() => setSelectedAuthor(a.id)}
            />
          ))}
          <h4 className="author-genre-header">Genres</h4>
          {genres.map((g) => (
            <Form.Check
              key={g.id}
              type="radio"
              id={`genre-${g.id}`}
              label={g.name}
              name="genres"
              checked={selectedGenre === g.id}
              onChange={() => setSelectedGenre(g.id)}
            />
          ))}
        </Col>
        <Col>
          <Row>
            {filteredBooks.map((b) => {
              const getAuthor = authors.find((a) => a.id == b.authorId);
              const getGenres = genres.find((g) => g.id == b.genreId);
              return (
                <Col xs={3} className="mt-3" key={b.id}>
                  <Card
                    onClick={() => handleShow(b)}
                    className="book-card h-100"
                  >
                    <Card.Img
                      style={{ height: "200px", objectFit: "cover" }}
                      variant="top"
                      src={b.image}
                    />
                    <Card.Body>
                      <Card.Title>{b.title}</Card.Title>
                      <Card.Text>
                        Author: {getAuthor?.name}
                        <br />
                        Genres: {getGenres?.name}
                        <br />
                        Price: {formatPrice(b.price)} {/* Thêm giá sách */}
                      </Card.Text>
                    
                      <Button
                        variant="link"
                        className="add-to-cart-button"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện click của Card
                          handleAddToCart(b);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i>{" "}
                      </Button>
                      
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>

      {/* Modal for Book Details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {selectedBook ? selectedBook.title : "Book Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook ? (
            <>
              <img
                src={selectedBook.image}
                alt={selectedBook.title}
                style={{ width: "100%", height: "auto" }}
              />
              <h5>
                Author:{" "}
                {authors.find((a) => a.id === selectedBook.authorId)?.name}
              </h5>
              <p>Description:{selectedBook.description}</p>
              <p>Published: {selectedBook.yearPublished}</p>
              <p>Price: {formatPrice(selectedBook.price)}</p>
           
             
            </>
          ) : (
            <p>Loading...</p> // Optional loading state
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

export default Home;
