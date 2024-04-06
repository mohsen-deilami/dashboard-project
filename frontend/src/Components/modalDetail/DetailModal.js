import React, { useEffect } from "react";
import "./DetailModal.css";
import ReactDOM from "react-dom";

export default function DetailModal({onHide,children}) {
  const modalsParent = document.getElementById("modals-parent");
 
  
  useEffect(()=>{
    const checkKey= (event) =>{
      if(event.keyCode === 27){
        onHide()
      }
     
    }
    window.addEventListener('keydown',checkKey)
    return ()=> window.removeEventListener('keydown' , checkKey)
  },)
  return ReactDOM.createPortal(
    <div className="modal-parent active-modal">
    <div className="details-modal">
      {children}
      
    
    </div>
  </div>,
    modalsParent
  );
}
