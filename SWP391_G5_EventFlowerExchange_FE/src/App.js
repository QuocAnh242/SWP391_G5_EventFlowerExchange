import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
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
import FlowerBatchDetail from "./pages/FlowerBatchDetail";
import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/flower/:id" element={<FlowerBatchDetail />} /> {/* Trang chi tiết sản phẩm */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin-user-management" element={<AdminUserManagement />} />
        </Routes>
        {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
