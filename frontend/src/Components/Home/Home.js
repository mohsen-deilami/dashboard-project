import React, { useEffect , useState } from "react";
import './Home.css'
import Chart from '../charts/Chart'

export default function Home() {
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allRabat, setAllRabat] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);
  const getAllOrders = () => {
    fetch(`http://localhost:8000/api/orders/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setAllOrders(result);
      });
  };
  const gettAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    gettAllProducts();
  }, []);

  useEffect(() => {
    getAllRabat();
  }, []);
  const getAllRabat = () => {
    fetch(`http://localhost:8000/api/offs`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setAllRabat(result);
      });
  };
  return (
    <div className="cms-main">
      <h2 className="cms-title">Home...</h2>
      <div className="chrat-top">
      <Chart  grid title="Products Info" data={allProducts} dataKeyy="sale" datakeyx='title' dataKeyy2='price'/>
     </div>
      <div className="chrat-botom">
        <div className="chrat-botom-left">
        <Chart  grid title="Benutzer Order" data={allOrders} dataKeyy="sale" datakeyx='productID' dataKeyy2='price'/>
        </div>
        <div className="chrat-botom-right">
        <Chart  grid title="Rabat List" data={allRabat} dataKeyy="percent"   datakeyx='productID' />
        </div>
      </div>
    </div>
  )
}
