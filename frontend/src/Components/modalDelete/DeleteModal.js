import React from 'react'
import  ReactDOM  from 'react-dom';
import './DeleteModal.css'

export default function DeleteModal({submit,cancelAction,title}) {
    
    const modalsParent = document.getElementById('modals-parent');
   
  return ReactDOM.createPortal(
    <div className='modal-parent active-modal'>
        <div className="delete-modal">
            <h2>{title}</h2>
            <div className="delete-modal-btns">
                <button className='btn delete-btn-accept' onClick={submit}>Yes</button>
                <button className='btn delete-btn-reject' onClick={cancelAction}>No</button>
            </div>
        </div>
      
    </div>,
    modalsParent
  )
}
