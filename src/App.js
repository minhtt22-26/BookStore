import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import CartDetail from "./components/CartDetail";
import Success from "./components/Success";

import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import Dashboard from "./components/Dashboard"

// Link con của BrowserRouer
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/success" element={<Success/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/updatebook/:id" element={<UpdateBook/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
