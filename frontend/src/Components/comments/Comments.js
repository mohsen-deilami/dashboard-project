/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import "./Comments.css";
import ErrorBox from "../errorBox/ErrorBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailModal from "../modalDetail/DetailModal";
import DeleteModal from "../modalDelete/DeleteModal";
import EditModal from "../modalEdit/EditModal";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRjecttModal, setIsShowRejectModal] = useState(false);
  const [mainCommentInfos, setCommentInfos] = useState({});
  const [commentId, setCommentId] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState("");

  const getAllComments = () => {
    fetch(`http://localhost:8000/api/comments/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAllComments(data);
      });
  };
  useEffect(() => {
    getAllComments();
  }, []);
  const notify = () => {
    setNotifyShow(true);
    toast("Wow so easy!");
  };
  const [notifyShow, setNotifyShow] = useState(false);
  const closeDetailModal = () => {
    setIsShowDetailModal(false);
  };
  //                                                     delete action
  const deleteModalSubmitAction = () => {
    fetch(`http://localhost:8000/api/comments/ ${commentId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setIsShowDeleteModal(false);
        getAllComments();
      });
  };
  const deleteModalCancelAction = () => {
    setIsShowDeleteModal(false);
  };
  //                                               edit action
  const editSubmitAction = (event) => {
    event.preventDefault();
    let editedComment = {
      body: newCommentBody,
    };

    fetch(`http://localhost:8000/api/comments/ ${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedComment),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsShowEditModal(false);
        getAllComments();
      });
  };
  const editRejectAction = () => {
    setIsShowEditModal(false);
  };
  //                                            accept action
  const acceptModalSubmitAction = () => {
    let newStatus = {
      isAccept: 1,
    };

    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
      headers: {
        "Conent-Type": "application/json",
      },
      body: JSON.stringify(newStatus),
    })
      .then((response) => response.json())
      .then(result => {
        
        setIsShowAcceptModal(false);
        getAllComments();
      });
  };
  
  const acceptModalCancelAction = () => {
    
        setIsShowAcceptModal(false);
    
  };
//                                          reject action
const  rejectModalSubmitAction=()=>{
  let newStatus = {
    isAccept: 0,
  };

  fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
    method: "POST",
    headers: {
      "Conent-Type": "application/json",
    },
    body: JSON.stringify(newStatus),
  })
    .then((response) => response.json())
    .then((data) => {
      
      setIsShowRejectModal(false);
      getAllComments();
    });
};

const rejectModalCancelAction=()=>{
  setIsShowRejectModal(false);
   
};

  return (
    <>

      <div className="cms-main">
      <h2 className="cms-title">Comments ...!</h2>
        {allComments.length ? (
          <table className="cms-table">
            <thead>
              <tr>
                <th>User-Name</th>
                <th>Product-Name</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setCommentInfos(comment);
                        setIsShowDetailModal(true);
                      }}
                    >
                      View-Comment{" "}
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button
                      onClick={() => {
                        setCommentId(comment.id);
                        setIsShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setNewCommentBody(comment.body);
                        setCommentId(comment.id);
                      }}
                    >
                      Edit
                    </button>

                    <button>Reply</button>

                    {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        Accept
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsShowRejectModal(true);
                          setCommentId(comment.id);
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
          <ErrorBox errorText="There is no Comment..." />
        )}
      </div>
      {/* Details */}
      {isShowDetailModal && (
        <DetailModal onHide={closeDetailModal}>
          <div className="comment-detail-content">
            <h2 className="comment-detail-comment">{mainCommentInfos.body}</h2>
            <button
              className="btn comment-detail-btn"
              onClick={closeDetailModal}
            >
              Close
            </button>
          </div>
        </DetailModal>
      )}
      {/* Delete */}
      {isShowDeleteModal && (
        <DeleteModal
          submit={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={"Are you sure for Delete Comment?!"}
        />
      )}
      {/* Edit */}
      {isShowEditModal && (
        <EditModal>
          <div className="edit-modal">
            <h1>Enter the new information ...</h1>

            <form action="#" className="edit-product-form">
              <textarea
                name=""
                id=""
                cols="60"
                rows="10"
                value={newCommentBody}
                onChange={(event) => setNewCommentBody(event.target.value)}
              ></textarea>
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
      {/* Accept */}
      {isShowAcceptModal && (
        <DeleteModal
          submit={acceptModalSubmitAction}
          cancelAction={acceptModalCancelAction}
          title={"Are you sure for Accpet Comment?!"}
        ></DeleteModal>
      )}
      {/*Reject*/}
      {isShowRjecttModal && (
        <DeleteModal
          submit={rejectModalSubmitAction}
          cancelAction={rejectModalCancelAction}
          title={"Are you sure for Reject Comment?!"}
        ></DeleteModal>
      )}
    </>
  );
}
