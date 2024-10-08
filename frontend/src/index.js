import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Toys from './components/Toys';
import Electronics from './components/Electronics';
import Shirts from './components/Signup';
import Homeappliances from './components/Homeappliances';
import Gadgets from './components/Gadgets';
import Personalcare from './components/Personalcare';
import Mobiles from './components/Mobiles';
import Laptops from './components/Laptops';
import Books from './components/Books';
import Airpods from './components/Airpods';
import Accessories from './components/Accessories';
import Allproducts from './components/Allproducts';
import { AuthProvider } from './authcontext/AuthContext'
const rt = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/Signup',
    element : <Signup/>
  },
  {
    path : '/login',
    element : <Login/>
  },
  {
    path : '/Electronics',
    element : <Electronics/>
  },
  {
    path : '/Toys',
    element : <Toys/>
  },
  {
    path : '/Homeappliances',
    element : <Homeappliances/>
  },
  {
    path : '/Shirts',
    element : <Shirts/>
  },
  {
    path : '/Gadgets',
    element : <Gadgets/>
  },
  {
    path : '/Personalcare',
    element : <Personalcare/>
  },
  {
    path : '/Mobiles',
    element : <Mobiles/>
  },
  {
    path : '/Laptops',
    element : <Laptops/>
  },
  {
    path : '/Accessories',
    element : <Accessories/>
  },
  {
    path : '/Allproducts',
    element : <Allproducts/>
  },
  {
    path : "/Airpods",
    element : <Airpods/>
  },
  {
    path : "/Books",
    element :<Books/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={rt}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
