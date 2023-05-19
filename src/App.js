import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import FilteredProduct from "./components/FilteredProduct";
import "./styles/style.css";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<FilteredProduct />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
