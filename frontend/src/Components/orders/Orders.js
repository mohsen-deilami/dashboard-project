import React, { useEffect , useState } from "react";
import "./Orders.css";
import ErrorBox from "../errorBox/ErrorBox";

import DeleteModal from "../modalDelete/DeleteModal";
import DetailModal from "../modalDetail/DetailModal";


export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [orderID, setOrderID] = useState("");
  const [mainOrder, setMainOrder] = useState("");
  const [isAcceptShowModal, setIsAcceptShowModal] = useState("");
  const [isRejectShowModal, setIsRejectShowModal] = useState("");

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

  /////////////////////////////////////      delete
  const deleteModalSubmitAction = () => {

    fetch(`http://localhost:8000/api/orders/${orderID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        getAllOrders();
        setIsShowDeleteModal(false);
      });
  };
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  ////////////////////////////////////////   accept 
const acceptModalSubmitAction =()=>{
  let newStatus = {
    isActive: 1,
  };
  console.log(orderID);
fetch(`http://localhost:8000/api/orders/active-order/${orderID}/${1}`,{
method:'PUT',
headers :{
  "Content-Type": "application/json",
},
body:JSON.stringify(newStatus)
})
.then(response =>response.json())
.then(result => {
  setIsAcceptShowModal(false);
  getAllOrders();
})
}
  const acceptModalCancelAction =()=>{
    setIsAcceptShowModal(false)
  }
  ////////////////////////////////////////   reject
  const rejectModalSubmitAction =()=>{
    let newStatus = {
      isActive: 0,
    };
   
  fetch(`http://localhost:8000/api/orders/active-order/${orderID}/${0}`,{
  method:'Put',
  headers :{
    "Content-Type": "application/json",
  },
  body:JSON.stringify(newStatus)
  })
  .then(response =>response.json())
  .then(result => {
    setIsRejectShowModal(false);
    getAllOrders();
  })
  }
//////////////////////////////////////////  Detail
  const rejectModalCancelAction =()=>{
setIsRejectShowModal(false)
  }

const closeModal=()=>{setIsShowDetailModal(false)}

  return (
    <div className="cms-main">
      <h2 className="cms-title">Orders...</h2>
      {allOrders.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>Product-Name</th>
              <th>User-Name</th>
              <th>Date</th>
              <th>Price</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.productID}</td>
                <td>{order.userID}</td>
                <td>{order.date}</td>
                <td>{order.price}$</td>
                <td>{order.count}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setOrderID(order.id);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setMainOrder(order)
                    }}
                  >
                    Detail
                  </button>

                  {order.isActive === 0 ? (
                    <button
                      onClick={() => {
                        setOrderID(order.id)
                        setIsAcceptShowModal(true);
                      }}
                    >
                      Accept
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOrderID(order.id)
                        setIsRejectShowModal(true);
                      }}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox errorText="There is no User" />
      )}
      {/* Delete */}
      {isShowDeleteModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={"Are you sure for Delete Comment?!"}
        ></DeleteModal>
      )}
{/* accept */}
      {isAcceptShowModal &&( 
      <DeleteModal
      submit={acceptModalSubmitAction}
      cancelAction={acceptModalCancelAction}
      title={"Are you sure for Accept ?!"}
      >

      </DeleteModal>
      )
      }
     {/* Reject */}
      {isRejectShowModal &&(
        <DeleteModal
        submit={rejectModalSubmitAction}
        cancelAction={rejectModalCancelAction}
        title={"Are you sure for Reject ?!"}
        >

        </DeleteModal>
        )}
        {/* Detail */}
        {isShowDetailModal && (
          <DetailModal onHide={closeModal}>
<table className="cms-table">
            <thead>
              <tr>
                <th>Stunde</th>
                <th>Rabat</th>
                <th>Einkauf</th>
                <th>Nummer-kauf</th>
              </tr>
             
            </thead>

            <tbody>
              <tr>
                <td>{mainOrder.hour} </td>
                <td>{mainOrder.off }%</td>
                <td>{mainOrder.sale}</td>
                <td>{mainOrder.sale_count}</td>
              </tr>
            </tbody>
          </table>
          </DetailModal>
        )}
    </div>
  );
}
