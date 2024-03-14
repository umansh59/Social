import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Auth/Login';
import Register from './Auth/Register';
import ResumeForm from './components/form/ResumeForm';

import { Navigate, Outlet } from 'react-router-dom';
import EntryList from './components/EntryList.js/EntryList';
import UpdateForm from './components/UpdateForm/UpdateForm';
import Adminreg from './Auth/Adminreg';
import './components/css/App/App.css'
// import ResumeDisplay from './components/display/ResumeData';
import ResumeData1 from './components/display/ResumeData1';

// import ResumeEditor from './components/display/Editor';
// import ResumeEditor from './components/ResumeEditor/ResumeEditor';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token && token !== 'undefined';

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="App">
      <Router>
         {/* Include the Navbar component */}
        <div id="container-route">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/adminreg" element={<Adminreg />} />

            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
            <Route path="/" element={<EntryList />} />
              <Route path="/form" element={<ResumeForm />} />
              <Route path="/updateForm/:id" element={<UpdateForm/>} />
              <Route path="/Resume/:id" element={<ResumeData1/>} />
              <Route path="/entries" element={<EntryList/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
