import React from 'react'
import './EditModal.css'
import ReactDOM from 'react-dom';

export default function EditModal({children}) {
    const modalsParent=document.getElementById('modals-parent');
  return ReactDOM.createPortal(
    <div className='modal-parent active-modal'>
         {children}
      
    </div>,
    modalsParent
  )
}
