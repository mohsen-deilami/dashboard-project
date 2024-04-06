import React, { useEffect, useState } from "react";
import './Products.css'
import AddNewProduct from '../addNewProduct/AddNewProduct'
import ProductsTable from  '../productsTable/ProductsTable'

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  const gettAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
      .then((response) => response.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    gettAllProducts();
  }, []);
  
  return (
    <div>
      <AddNewProduct gettAllProducts={gettAllProducts}/>
      <ProductsTable gettAllProducts={gettAllProducts} allProducts={allProducts}/>
     
    </div>
  )
}
