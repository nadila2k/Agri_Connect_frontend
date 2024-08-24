import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>

          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />

          {/* Authenticate Routes */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
