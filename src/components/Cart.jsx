import React, { useContext } from "react";
import { myContext } from "../App";

const Cart = () => {
  const [data, setData] = useContext(myContext); // use context to set the data

  const totalPrice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 0),
    0
  );

  const totalQuantity = data.reduce(
    (total, data) => total + (data.quantity || 0),
    0
  );

  //  Funtion to handle the + button
  const handleIncrease = (id) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          const newQuantity =
            item.quantity === undefined || item.quantity === 0
              ? 1
              : item.quantity + 1;
          return {
            ...item,
            quantity: newQuantity,
            itemPrice: newQuantity * item.price,
          };
        }
        return item;
      });
    });
  };

  //  Funtion to handle the - button
  const handleDecrease = (id) => {
    setData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id && item.quantity && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
            itemPrice: item.quantity * item.price,
          };
        }
        return item;
      });
    });
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#B0BEC5" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            HOME
          </a>
          <a style={{ marginRight: "auto" }} className="navbar-brand" href="#">
            PRODUCTS
          </a>
          <a className="navbar-brand" href="#">
            ABOUT
          </a>
          <a className="navbar-brand" href="#">
            CONTACT US
          </a>
        </div>
      </nav>
      <div className="container">
        {data.map((item) => {
          return (
            <CartItem
              item={item}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          );
        })}
        <div
          style={{
            borderTop: "1px solid #000",
            padding: "24px",
            marginTop: "30px",
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h4>Total Quantity</h4>
            <h2 style={{ marginLeft: "auto" }}>{totalQuantity}</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h4>Total Price</h4>
            <h2 style={{ marginLeft: "auto" }}>{"$" + totalPrice}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

// cart items
const CartItem = ({ item, handleIncrease, handleDecrease }) => {
  return (
    <div>
      <div
        className="card"
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          width: "70rem",
          marginTop: "10px",
        }}
      >
        <div style={{ flex: "0 0 auto", marginRight: "24px" }}>
          <img src={item.thumbnail} height={200} width={300} />
        </div>
        <div>
          <h1>{item.title}</h1>
          <p style={{ fontSize: "18px " }}>{item.description}</p>
          <h5 style={{ fontStyle: "italic" }}>Brand: {item.brand}</h5>
          <h5>Selling price:{`\ $${item.price}`}</h5>

          <h6 style={{ fontSize: "18px", color: "red" }}>
            Stock Left: {item.stock}
          </h6>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => handleIncrease(item.id, item.quantity)}
            style={{
              borderRadius: "8px",
              backgroundColor: "#546E7A",
              color: "white",
              height: "38px",
              width: "30px",
            }}
          >
            +
          </button>
          <div style={{ border: "1px solid white", padding: "5px" }}>
            {item.quantity ? item.quantity : 0}
          </div>
          <button
            onClick={() => handleDecrease(item.id, item.quantity)}
            style={{
              borderRadius: "8px",
              backgroundColor: "#546E7A",
              color: "white",
              height: "38px",
              width: "30px",
            }}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
