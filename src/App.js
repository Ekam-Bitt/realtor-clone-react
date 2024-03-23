import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Profile" element={<PrivateRoute />}>
            <Route path="/Profile" element={<Profile />}></Route>
          </Route>
          <Route path="/Sign-In" element={<SignIn />}></Route>
          <Route path="/Sign-Up" element={<SignUp />}></Route>
          <Route path="/Forgot-Password" element={<ForgotPassword />}></Route>
          <Route path="/Offers" element={<Offers />}></Route>
          <Route path="/Create-Listing" element={<PrivateRoute />}>
            <Route path="/Create-Listing" element={<CreateListing />}></Route>
          </Route>
          <Route path="/Edit-Listing" element={<PrivateRoute />}>
            <Route path="/Edit-Listing/:listingId" element={<EditListing />}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
