import React, { useContext } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import AppContext from "../provider/Context";
import "./ManageProducts.css";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
function ManageProducts() {
  const { authors, genres, book, setBook } = useContext(AppContext);
const navigate = useNavigate();

const handleDelete = async (id) => {
 
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this book?"
  );
  if (!confirmDelete) return; 

  try {

    await axios.delete(`http://localhost:9999/books/${id}`);

    // Cập nhật state để xóa sách khỏi danh sách hiển thị
    const updatedBooks = book.filter((b) => b.id !== id);
    setBook(updatedBooks);
    alert("Book deleted successfully!");
  } catch (error) {
    alert("Error deleting book: " + error.message);
  }
};



  return (
    <Container>
      <Row>
        <Col className="center">Manage Product</Col>
      </Row>
      <Row>
        <Table striped className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year Published</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {book.map((b) => {
              const getAuthor = authors.find((a) => a.id === b.authorId);
              const getGenre = genres.find((g) => g.id === b.genreId);
              return (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{getAuthor?.name}</td>
                  <td>{getGenre?.name}</td>
                  <td>{b.yearPublished}</td>
                  <td>{b.description}</td>
                  <td>
                    <img
                      src={b.image}
                      alt={b.title}
                      className="product-image"
                    />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link to={`/updatebook/${b.id}`}>
                        <Button variant="primary">Update</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <Button
            variant="success"
            className="mt-3 ms-2"
            onClick={() => navigate("/addbook")}
          >
            Add Book
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageProducts;
