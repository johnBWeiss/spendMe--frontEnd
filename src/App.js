import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './views/Home/Home';
import MonthDetails from './views/MonthDetails/MonthDetails'
import Login from './views/Login/Login'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Login />} ></Route>
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/Monthdetailes' element={<MonthDetails />} ></Route>

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
