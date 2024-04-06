import React, { useState } from "react";
import "./AddNewProduct.css";
import { RiProductHuntLine } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { LiaAddressCardSolid } from "react-icons/lia";
import { LiaSalesforce } from "react-icons/lia";

export default function AddNewProduct({ gettAllProducts }) {
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newPopular, setNewPopular] = useState("");
  const [newNumberSale, setNewNumberSale] = useState("");
  const [newColor, setNewColor] = useState("");

  const addNewProductHandel = (event) => {
    event.preventDefault();
    let newProduct = {
      title: newTitle,
      price: newPrice,
      count: newCount,
      img: newImg,
      popularity: newPopular,
      sale: newNumberSale,
      colors: newColor,
    };

    fetch("http://localhost:8000/api/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result :", result);
        gettAllProducts();
        clearInput();
      });
  };
  function clearInput() {
    setNewTitle("");
    setNewPrice("");
    setNewCount("");
    setNewImg("");
    setNewPopular("");
    setNewNumberSale("");
    setNewColor("");
  }
  return (
    <div>
      <h2 className="product-title">Add New Product ...!</h2>
      <form action="#" className="new-product-form">
        <div className="add-product-wrapper">
          <div className="add-product-group">
            <span className="product-icon">
              <RiProductHuntLine />
            </span>

            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Name Product"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <MdOutlineProductionQuantityLimits />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Count Product"
              value={newCount}
              onChange={(event) => setNewCount(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <AiOutlineBarChart />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Pupuler Product"
              value={newPopular}
              onChange={(event) => setNewPopular(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <VscSymbolColor />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Color Product"
              value={newColor}
              onChange={(event) => setNewColor(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Price Product"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <LiaAddressCardSolid />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Image Address Product"
              value={newImg}
              onChange={(event) => setNewImg(event.target.value)}
            />
          </div>
          <div className="add-product-group">
            <span className="product-icon">
              <LiaSalesforce />
            </span>
            <input
              type="text"
              className="add-product-input"
              placeholder="Enter The Number Sale Product"
              value={newNumberSale}
              onChange={(event) => setNewNumberSale(event.target.value)}
            />
          </div>
        </div>
        <button className="btn" onClick={addNewProductHandel}>
          Submit
        </button>
      </form>
    </div>
  );
}
