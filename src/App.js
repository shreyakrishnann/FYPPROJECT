import { Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./components/WelcomePage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import ErrorPage from "./Pages/ErrorPage";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
