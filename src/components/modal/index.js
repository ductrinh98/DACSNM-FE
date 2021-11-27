import React from "react";
import Modal from "react-responsive-modal";

function myModal(props) {
    return(
        <Modal open={props.open} onClose={props.closeModal} center>
            <div className="m-5 text-center">
                <div className="md-12">
                    <h1>{props.message}</h1>
                </div>
            </div>
            <div className="justify-content-center text-center">
                <div className="md-6">
                    <button className="mx-autho btn btn-primary" onClick={props.closeModal}>Close</button>
                </div>
            </div>
        </Modal>
    )
}

export default myModal;