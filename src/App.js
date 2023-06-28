import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
function App() {
  return (
    <>
      <h1 className=" underline">Hello world!</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/Sign-In' element={<SignIn/>}></Route>
          <Route path='/Sign-Up' element={<SignUp/>}></Route>
          <Route path='/Forgot-Password' element={<ForgotPassword/>}></Route>
          <Route path='/Offers' element={<Offers/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
