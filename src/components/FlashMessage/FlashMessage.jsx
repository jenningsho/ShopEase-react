import { useEffect } from "react"
import '../FlashMessage/FlashMessage.css';

const FlashMessage = ( { message, duration = 2000, onClose} ) => {

    useEffect( () => {
        if(message){
            console.log("flashmessage déclenché");
            const timer = setTimeout( () => {
                onClose();
            }, duration);

            return () => clearTimeout(timer); // nettoie le timer
        }
    }, [message, duration, onClose]);

    if(!message)return null;

    return(
        <div className="flash-message">{message}</div>
    )
}

export default FlashMessage;