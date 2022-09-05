import {HashRouter, Routes, Route} from 'react-router-dom';

import Dashboard from "./dashboard";
import ManageOrder from "./manageorder";
import ManageProduct from './manageproduct';

function AdminApp() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/manageproduct" element={<ManageProduct/>} />
        <Route exact path="/manageorder" element={<ManageOrder/>} />
      </Routes>
    </HashRouter>
  );
}

export default AdminApp;
