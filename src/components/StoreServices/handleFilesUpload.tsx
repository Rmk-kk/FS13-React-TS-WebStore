import React from "react";
import {Store} from "react-notifications-component";
import StoreServices from "./StoreServices";

const service = new StoreServices();
const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>, setState:React.Dispatch<React.SetStateAction<string>>): void => {
    if(e.target.files) {
        const files = Array.from(e.target.files)
        service.uploadFile(files[0])
            .then((res) => {
                setState(res.data.location)
            })
            .then(() => Store.addNotification({
                title: "Image uploaded successfully",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
            .catch(() => Store.addNotification({
                title: "Couldn't upload the image",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            }))
    }
}

export default handleFileSelected