import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Home from './Home';
import Products from './Products';
import ProductDetails from "./ProductDetails";
import About from './About';
import Cart from './Cart';
import './App.css'
import { ShoppingCart } from "./Icons";
import { Link } from 'react-router-dom';


const openNav = () => {
  document.getElementById("mobile-nav").style.height = "100%";
}

function App() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [cart, setCart] = useState([]);

  function addProducts (x, data) {
    setTotalProducts(prevTotalProducts => prevTotalProducts + x);
    console.log(data);
    console.log(data._id)

    //if this product already exists in the cart, add to quantity
    if (cart.filter(x => x._id === data._id).length>0) {
      let index = cart.findIndex(object => {
        return object._id === data._id;
      });
      let newCart = [...cart];
      newCart[index].qty += x;
      setCart([...newCart]);

    }
    //otherwise add the product id, price, and qty to cart
    else {
      let object = {};
      object["_id"] = data._id;
      object["title"] = data.title;
      object["image"] = data.image;
      object["price"] = data.price;
      object["qty"] = x;
      setCart(prevCart => [...prevCart, object]);
    }
  }

  function delProducts (x, _id) {
    setTotalProducts(prevTotalProducts => prevTotalProducts - x);

    let index = cart.findIndex(object => {
      return object._id === _id;
    });

    let newCart = [...cart];

    //completely remove product from cart
    if (cart[index].qty === x) {
      newCart.splice(index, 1);
    }
    //otherwise decrement qty by x
    else {
      newCart[index].qty -= x;
    }
    setCart([...newCart]);
  }

  return (
    <Router basename="/">
      <div className="content">
        <div className="main-container">
          <div className="header">
            <Nav />
            <div className="cart">
              <Link to="/cart"><ShoppingCart /></Link>
              {totalProducts}
              <a href="javascript:void(0);" className="burger-menu" onClick={openNav}>
                    <i class="fa fa-bars"></i>
            </a>
            </div>
            
          </div>
          <div className="route-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/products/:id" element={<ProductDetails addProducts={addProducts}/>} />
              <Route path="/cart" element={<Cart cart={cart} delProducts={delProducts} addProducts={addProducts}/>} />
            </Routes>
          </div>
        </div>
        <div className="footer">
        <a href="https://github.com/maggielau" target="_blank"><img src={process.env.PUBLIC_URL + "/images/github-logo-small-white.svg"} /></a>Maggie Lau
        </div>
      </div>
    </Router>
  );
}

export default App;
