import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cart';
import AdminUserManagement from './pages/AdminUserManagement';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminUserManagement />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
