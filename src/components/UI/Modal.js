import { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import "./Modal.css";

const Backdrop = (props) => {
    return <div className="backdrop" onClick={props.onClose}></div>
}

const ModalOverlay = (props) => {
    return (
        <Card className="modal">
            <div className="content">
                {props.children}
            </div>
        </Card>
    );

}

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("modal"))}
            {ReactDOM.createPortal(<ModalOverlay> {props.children} </ModalOverlay>, document.getElementById("modal"))}
        </Fragment>
    );
}

export default Modal;