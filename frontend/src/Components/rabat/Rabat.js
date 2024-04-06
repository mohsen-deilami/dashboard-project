import { useEffect, useState } from "react";
import React from "react";
import ErrorBox from "../errorBox/ErrorBox";
import "./Rabat.css";
import DeleteModal from "../modalDelete/DeleteModal";
import DetailModal from "../modalDetail/DetailModal";
export default function Rabat() {
  const [allRabat, setAllRabat] = useState([]);
  const [isShowDetailtModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [rabatID, setRabatID] = useState(null);
  const [mainRbat, setMainRabat] = useState(null);

  const [isActiveShowModal, setIsActiveShowModal] = useState("");
  const [isDeactiveShowModal, setIsDeactiveShowModal] = useState("");

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

  ////////////////////////////////      Delete
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/offs/${rabatID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        getAllRabat();
        setIsShowDeleteModal(false);
      });
  };
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };
  /////////////////////////////////   Detail
  const closeModal = () => {
    setIsShowDetailModal(false);
  };

  ///////////////////////////////////   active
 const activeModalSubmitAction =()=>{
  let newStatus = {
    isActive: 1,
  };
  
fetch(`http://localhost:8000/api/offs/active-off/${rabatID}/${1}`,{
method:'PUT',
headers :{
  "Content-Type": "application/json",
},
body:JSON.stringify(newStatus)
})
.then(response =>response.json())
.then(result => {
 
  getAllRabat();
  setIsActiveShowModal(false)
})

 }

  const activeModalCancelAction=()=>{
    setIsActiveShowModal(false)
  } 

  ///////////////////////////////////   deactive
 const deactiveModalSubmitAction=()=>{
  let newStatus = {
    isActive: 0,
  };
fetch(`http://localhost:8000/api/offs/active-off/${rabatID}/${0}`,{
method:'PUT',
headers :{
  "Content-Type": "application/json",
},
body:JSON.stringify(newStatus)
})
.then(response =>response.json())
.then(result => {
 
  getAllRabat();

  setIsDeactiveShowModal(false)
})

 }
 const deactiveModalCancelAction=()=>{
setIsDeactiveShowModal(false)
 }
  return (
    <div className="cms-main">
      <h2 className="cms-title">Rabat...</h2>
      {allRabat.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>Name-Product</th>
              <th>Precent</th>
              <th>Admin-Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allRabat.map((rabat) => (
              <tr key={rabat.id}>
                <td>{rabat.productID}</td>
                <td>{rabat.percent}%</td>
                <td>{rabat.adminID}</td>
                <td>{rabat.date}</td>
                {rabat.isActive === 1 ? <td>Active</td> : <td>Deactive</td>}
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setRabatID(rabat.id);
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setMainRabat(rabat);
                    }}
                  >
                    Detail
                  </button>
                  {rabat.isActive === 1 ? (
                    <button
                    onClick={()=>
                      {setIsDeactiveShowModal(true)
                        setRabatID(rabat.id)
                      }
                    }
                    >Deactive</button>
                  ) : (
                    <button
                    onClick={()=>
                      {
                        setIsActiveShowModal(true)
                        setRabatID(rabat.id)
                      }
                    }
                    >Active</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox errorText="There is no Rabat" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={" Are you sure for Delete Rabat?!"}
        />
      )}
      {isShowDetailtModal && (
        <DetailModal onHide={closeModal}>
          <table className="cms-table">
            <thead>
              <tr>
                <th>Name-Product</th>
                <th>Precent</th>
                <th>Admin-Name</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{mainRbat.productID} </td>
                <td>{mainRbat.percent}%</td>
                <td>{mainRbat.adminID}</td>
                <td>{mainRbat.date}</td>
              </tr>
            </tbody>
          </table>
        </DetailModal>
      )}
{isActiveShowModal && (
  <DeleteModal submit={activeModalSubmitAction}
  cancelAction={activeModalCancelAction}
  title={"Are you sure for Active ?!"}>

  </DeleteModal>
)}
      {isDeactiveShowModal && (
<DeleteModal submit={deactiveModalSubmitAction}
        cancelAction={deactiveModalCancelAction}
        title={"Are you sure for Deactive ?!"}>
    
  </DeleteModal>
      )}
      
    </div>
  );
}
