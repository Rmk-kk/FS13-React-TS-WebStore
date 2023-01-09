import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import ReactDOM from "react-dom";

export interface NotificationMessageProps {
    message: string,
    type: string,
    id: number,
}
const NotificationMessage = (props:NotificationMessageProps) => {
    const {message, type, id} = props;
    // const customId = "custom-id-yes";

    useEffect(() => {
        if(type === 'success') {
             toast.success(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: id
            });
        } else if(type === 'error') {
            toast.error(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                toastId: id
            });
        }
    }, [props])

    return ReactDOM.createPortal(
        <>
            <ToastContainer position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"/>
        </>, document.getElementById('modal-window')!
    );
}

export default NotificationMessage