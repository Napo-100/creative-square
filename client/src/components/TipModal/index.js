import React, { useState } from 'react';
import Modal from 'react-modal'


const TipModal = ({modalState}) =>{
    
    const [modalIsOpen, setModalIsOpen] = useState(modalState)
    
    return (
        <div>
            <Modal isOpen={modalIsOpen}>
            <button onClick={() => setModalIsOpen(false)}>close</button>
            </Modal>
        </div>
    )
}

export default TipModal;