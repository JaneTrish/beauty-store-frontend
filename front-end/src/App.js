import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  Home,
  About,
  Products,
  SingleProduct,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  Auth,
  Profile,
  DeleteUser,
  OrderConfirm,
} from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<SingleProduct />} />
        <Route
          path='checkout'
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path='auth' element={<Auth />} />
        <Route path='showMe' element={<Profile />} />
        <Route path='deleteUser' element={<DeleteUser />} />
        <Route path='orderConfirm' element={<OrderConfirm />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
