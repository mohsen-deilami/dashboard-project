/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "../modalDelete/DeleteModal";
import EditModal from "../modalEdit/EditModal";
import DetailModal from "../modalDetail/DetailModal";
import ErrorBox from "../errorBox/ErrorBox";


import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { VscSymbolColor } from "react-icons/vsc";
import { LiaAddressCardSolid } from "react-icons/lia";
import { LiaSalesforce } from "react-icons/lia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsTable({ gettAllProducts, allProducts }) {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [mainProductInfos, setMainProductInfos] = useState({});

  const [chartinfo , setChartinfo]=useState(false)

  ///////////// state for edit
  const [newProductId, setNewProductId] = useState("");
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  //show notify
  const notify = (title) => {
    setNotifyShow(true);
    toast(title);
  };
  const [notifyShow, setNotifyShow] = useState(false);

  //////////////////////////////////////////   Delete
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
    
  };
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        notify("Product wird Delete....!");
        setIsShowDeleteModal(false);
        gettAllProducts();
      });
  };
  ////////////////////////////////////////// Edit

  let editedProduct = {
    id: newProductId,
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };
  const editSubmitAction = () => {
    setIsShowEditModal(false);
    fetch(`http://localhost:8000/api/products/${newProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((result) => gettAllProducts());
  };
  const editRejectAction = () => {
    setIsShowEditModal(false);
    
  };

  //////////////////////////////////////////// Detail
  const closeDetailModal = () => {
    setIsShowDetailModal(false);
   
  };


     
    


  return (
    <>
    <div className="cms-main">
      {allProducts.length ? (
        <table className="cms-table">
          <thead>
            <tr >
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Number</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.map((product) => (
              <tr  key={product.id}>
                <td>
                  <img
                    src={product.img}
                    alt="Product image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price}$</td>
                <td>{product.count}</td>
                <td>
                <button
                    className="btn products-table-btn"
                    onClick={() => {
                      setProductId(product.id);
                      setIsShowDeleteModal(true);
                      
                    }}
                  >
                    Delete
                  </button>
                                   

                  <button
                    className="btn products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);

                      // insert productIfo in state

                      setNewProductId(product.id);
                      setNewProductTitle(product.title);
                      setNewProductPrice(product.price);
                      setNewProductCount(product.count);
                      setNewProductImg(product.img);
                      setNewProductPopularity(product.popularity);
                      setNewProductSale(product.sale);
                      setNewProductColors(product.colors);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn products-table-btn"
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setMainProductInfos(product);
                    }}
                    >
                    Details
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox errorText="There is no Product" />
      )}
      {notifyShow && <ToastContainer />}

      {/* Details */}
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Popular</th>
                <th>Sale</th>
                <th>Color</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainProductInfos.title}</td>
                <td>{mainProductInfos.popularity}%</td>
                <td>{mainProductInfos.sale}$</td>
                <td>{mainProductInfos.colors}</td>
              </tr>
            </tbody>
          </table>



        </DetailModal>
      )}

      {/* Delete */}
      {isShowDeleteModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={'Are you sure for Delete Product?!'}
        />
      )}

      {/* Edit */}
      {isShowEditModal && (
        <EditModal>
          <div className="edit-modal">
            <h1>Enter the new information ...</h1>

            <form action="#" className="edit-product-form">
              <div className="edit-product-group">
                <span className="product-icon">
                  <RiProductHuntLine />
                </span>
                <span className="edit-title">Name : </span>

                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Name Product"
                  value={newProductTitle}
                  onChange={(event) => setNewProductTitle(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                <span className="product-icon">
                  <AiOutlineDollarCircle />
                </span>
                <span className="edit-title">Price : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Price Product"
                  value={newProductPrice}
                  onChange={(event) => setNewProductPrice(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                <span className="product-icon">
                  <AiOutlineBarChart />
                </span>
                <span className="edit-title">Count : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The count Product"
                  value={newProductCount}
                  onChange={(event) => setNewProductCount(event.target.value)}
                />
              </div>

              <div className="edit-product-group">
                <span className="product-icon">
                  <LiaAddressCardSolid />
                </span>
                <span className="edit-title">Img Address : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The img Address Product"
                  value={newProductImg}
                  onChange={(event) => setNewProductImg(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                <span className="product-icon">
                  <AiOutlineBarChart />
                </span>
                <span className="edit-title">Popurrity : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Popularity Product"
                  value={newProductPopularity}
                  onChange={(event) =>
                    setNewProductPopularity(event.target.value)
                  }
                />
              </div>
              <div className="edit-product-group">
                <span className="product-icon">
                  <LiaSalesforce />
                </span>
                <span className="edit-title">Sale : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Sale Product"
                  value={newProductSale}
                  onChange={(event) => setNewProductSale(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                <span className="product-icon">
                  <VscSymbolColor />
                </span>
                <span className="edit-title">Color : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Color Product"
                  value={newProductColors}
                  onChange={(event) => setNewProductColors(event.target.value)}
                />
              </div>

              <button
                className="btn btn-edit-modal-submit"
                onClick={editSubmitAction}
              >
                Submit
              </button>
              <button
                className="btn btn-edit-modal-reject"
                onClick={editRejectAction}
              >
                Cancel
              </button>
            </form>
          </div>
        </EditModal>
      )}

     
        
     
      </div>
    </>
  );
}
