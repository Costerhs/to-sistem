import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { deleteCookie, getCookie } from './assest/defFunction';
import Header from './component/header/Header';
import Auth from './page/auth/Auth';
import Home from './page/home/Home';
import Admin from './page/admin/Admin';
const App = () => {
  const locat = useLocation();
  const [location, setLocation] = useState(false);
  const navigate = useNavigate();
  console.log(getCookie('token'))
  useEffect(() => {
    if (!getCookie('token')) {
      navigate('auth')
    }
  }, [getCookie('token')])

  useEffect(() => {
    if (locat.pathname === "/auth") {
      setLocation(true);
    } else {
      setLocation(false);
    }
  }, [locat]);

  return (
    <div className="App">
      {!location && <Header />}
      <Routes>
        <Route path='auth' element={<Auth />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
