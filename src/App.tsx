import { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </Fragment>
  );
}

export default App;
