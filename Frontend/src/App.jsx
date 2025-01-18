import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/layouts/Navbar';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Main from './components/layouts/Main';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Main><Home/></Main>}/> 
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;
