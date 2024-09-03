import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashbord";  
import AuthRoutes from "./Routes/AuthRoutes";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>

          {/* Guest Routes */}
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/admin" element={<AdminDashboard />} /> 
          </Route>

          {/* SignIn SignUp */}
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />

          {/* Authenticate Routes */}
          


          

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
