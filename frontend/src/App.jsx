// App.js
import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import { AuthProvider } from './Context/ContextAuth';
import Home from './Components/Home';
import ProtectedRoutes from './Utilities/ProtectedRoutes';
import NavBar from './Components/NavBar';
import AddEmployee from './Components/AddEmployee';
import ViewEmployee from './Components/ViewEmployee';
import EditEmployee from './Components/EditEmployee';
import EmpDetailsView from './Components/EmpDetailsView';

const App = () => {
  const location = useLocation()

  const hideNavBarPaths = ['/signup', '/signin']

  const isAuthPage = hideNavBarPaths.includes(location.pathname)

  return (

    <div className="app-layout">
   

      <div className={isAuthPage ? 'auth-content' : 'main-content'}>
        <Routes>
          <Route element={
            <ProtectedRoutes role={['Admin', 'Employee']}><NavBar /></ProtectedRoutes>} >
            
            <Route path='/' element={<Home />} />
            <Route path='/addemp' element={<AddEmployee />} />
            <Route path='/employee' element={<ViewEmployee />} />
            <Route path='/editemp/:id' element={<EditEmployee />} />
            <Route path='/empdetails/:id' element={<EmpDetailsView />} />
          </Route>

          <Route path='/signin' element={<SignIn />} />

          <Route path='/signup' element={<SignUp />} />


        </Routes>
      </div>
    </div>
  );
};
const MainApp = () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)

export default MainApp;
