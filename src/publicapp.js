import {HashRouter, Routes, Route} from 'react-router-dom';

import Cart from "./cart";
import Myhome from "./home";
import Login from './login';

function PublicApp() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Myhome/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </HashRouter>
  );
}

export default PublicApp;
