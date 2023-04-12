import React from 'react';
import Navigation from './components/Navigation/Navigation';
import NavBar from "./components/Navigation/NavBar"
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';

// import HomePage from './pages/Home';
// import DetailsPage from './pages/Details';
// import NestedComponent from './components/NestedComponent/NestedComponent';
// import ProfilePage from './pages/Profile';

function App() {
  return ( <>
    {/* <Navigation /> */}
    <NavBar/>
    <Routes>
      <Route index element={<Navigate to={'/home'} />}></Route>
      {/* <Route path="/cocktails" element={<NestedComponent/>}>
        <Route path={'catalog'} element={<HomePage />}></Route>
        <Route path={'details/:id'} element={<DetailsPage />}></Route>
      </Route>       */}
      {/* <Route path="/profile" element={<ProfilePage/>}/> */}
      {/* <Route path={'/filters'} element={<div>Filters screen</div>}></Route> */}
      <Route path={'*'} element={<div>NOT FOUND BRAT</div>}></Route>
    </Routes>
  </>
  );
}

export default App;





