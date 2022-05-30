import './App.css';
import { useSelector } from 'react-redux';

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
import YearDetails from './views/YearDetails/YearDetails'

//I decided against routeguard, instead will implement a local redirect in every component for auth. 
// this will take care of case where the app is on certain page after passing a routeguard, then token expires.

function App() {

  const token = useSelector((state) => state.userToken);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />

          {/* <Route exact path='/' element={!token ? <Login /> : <Home />} /> */}
          <Route path='/home' element={<Home />} ></Route>
          <Route path='/yeardetails' element={<YearDetails />} ></Route>
          <Route path='/monthdetails' element={<MonthDetails />} ></Route>

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
