/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./Users.css";
import ErrorBox from "../errorBox/ErrorBox";
import DetailModal from "../modalDetail/DetailModal";
import DeleteModal from "../modalDelete/DeleteModal";
import EditModal from "../modalEdit/EditModal";
import Chart from '../charts/Chart'

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [userID, setUserID] = useState(null);
  const [mainUser,setMainUser]=useState(null);
 

  const [userNewFirsname, setUserNewFirsname] = useState("");
  const [userNewLastname, setUserNewLastname] = useState("");
  const [userNewUsername, setUserNewUsername] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userNewPhone, setUserNewPhone] = useState("");
  const [userNewCity, setUserNewCity] = useState("");
  const [userNewEmail, setUserNewEmail] = useState("");
  const [userNewAddress, setUserNewAddress] = useState("");
  const [userNewBuy, setUserNewBuy] = useState("");
  const [userNewScore, setUserNewScore] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch(`http://localhost:8000/api/users/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAllUsers(data));
  };

  ////////////////////////////////////       delete
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return new Error("erroe");
        }
      })
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllUsers();
      });
  };

  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };

  //////////////////////////           edit
const editSubmitAction =(event)=>{
  event.preventDefault();
  const userNewInfos = {
    firsname: userNewFirsname,
    lastname: userNewLastname,
    username: userNewUsername,
    password: userNewPassword,
    phone: userNewPhone,
    city: userNewCity,
    email: userNewEmail,
    address: userNewAddress,
    score: userNewScore,
    buy: userNewBuy,
  };
 fetch(`http://localhost:8000/api/users/ ${userID}`,{
method:'PUT',
headers :{
  "Content-Type": "application/json",
},
body: JSON.stringify(userNewInfos)

 }).then(response=>response.json())
 .then(result =>{
   setIsShowEditModal(false)
  getAllUsers();
 })

}
  const editRejectAction =()=>{
    setIsShowEditModal(false)
  }
  const closeDetailModal=()=>{
    setIsShowDetailModal(false)
  }
  return (
    <div className="cms-main">
      <h2 className="cms-title">Users...</h2>
      {allUsers.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User-Name</th>
              <th>Password</th>
              <th>Phone</th>
              <th>E-Mail</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firsname} - {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setUserID(user.id);
                     
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setIsShowEditModal(true);
                      setUserID(user.id);
                      setUserNewFirsname(user.firsname);
                      setUserNewLastname(user.lastname);
                      setUserNewUsername(user.username);
                      setUserNewPassword(user.password);
                      setUserNewPhone(user.phone);
                      setUserNewCity(user.city);
                      setUserNewEmail(user.email);
                      setUserNewAddress(user.address);
                      setUserNewBuy(user.buy);
                      setUserNewScore(user.score);
                    }}
                  >
                    Edit
                  </button>

                  <button
                  onClick={()=>{
                    setIsShowDetailModal(true)
                  setMainUser(user)
                 
                  }
                }
                  >Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox errorText="There is no User" />
      )}
      {isShowDeleteModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={"Are you sure for Delete User?!"}
        ></DeleteModal>
      )}
      {isShowEditModal && <EditModal>
        <div className="edit-modal">
            <h1>Enter the new information ...</h1>

            <form action="#" className="edit-product-form">
              <div className="edit-product-group">
                
                <span className="edit-title">FirstName : </span>

                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Firstname"
                  value={userNewFirsname}
                  onChange={event =>setUserNewFirsname(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                
                <span className="edit-title">LastName : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Lastname"
                  value={userNewLastname}
                  onChange={event =>setUserNewLastname(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                
                <span className="edit-title">UserName : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Username"
                  value={userNewUsername}
                  onChange={event =>setUserNewUsername(event.target.value)}
                />
              </div>

              <div className="edit-product-group">
               
                <span className="edit-title">Password : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The  Password"
                  value={userNewPassword}
                  onChange={event =>setUserNewPassword(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                
                <span className="edit-title">Phone : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Phone"
                  value={userNewPhone}
                  onChange={event =>setUserNewPhone(event.target.value)}
                 
                />
              </div>
              <div className="edit-product-group">
               
                <span className="edit-title">City : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The City"
                  value={userNewCity}
                  onChange={event =>setUserNewCity(event.target.value)}
                />
              </div>
              <div className="edit-product-group">
                
                <span className="edit-title">E-mail : </span>
                <input
                  type="email"
                  className="edit-product-input"
                  placeholder="Enter The E-mail"
                  value={userNewEmail}
                  onChange={event =>setUserNewEmail(event.target.value)}
                 
                />
              </div>
              <div className="edit-product-group">
               
                <span className="edit-title">Address : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Address"
                  value={userNewAddress}
                  onChange={event =>setUserNewAddress(event.target.value)}
                 
                />
              </div>
              <div className="edit-product-group">
               
                <span className="edit-title">Buy : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Buy"
                  value={userNewBuy}
                  onChange={event =>setUserNewBuy(event.target.value)}
                 
                />
              </div>
              <div className="edit-product-group">
               
                <span className="edit-title">Score : </span>
                <input
                  type="text"
                  className="edit-product-input"
                  placeholder="Enter The Score"
                  value={userNewScore}
                  onChange={event =>setUserNewScore(event.target.value)}
                 
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
        </EditModal>}
        {isShowDetailModal &&(
          <DetailModal onHide={closeDetailModal}>
            <table className="cms-table">
            <thead>
              <tr>
                <th>Name-Famili</th>
                <th>Address</th>
                <th>Buy</th>
                <th>Score</th>
              </tr>
             
            </thead>

            <tbody>
              <tr>
                <td>{mainUser.firsname} - {mainUser.lastname}</td>
                <td>{mainUser.address}</td>
                <td>{mainUser.buy}</td>
                <td>{mainUser.score}</td>
              </tr>
            </tbody>
          </table>
          </DetailModal>
        )}
       
          <Chart  grid title="Benutzer infos" data={allUsers} dataKeyy="buy" datakeyx='lastname' />
       
    </div>
  );
}
