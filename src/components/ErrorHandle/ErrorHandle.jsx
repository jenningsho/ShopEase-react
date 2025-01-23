import "./ErrorHandle.css"

const ErrorHandle = ({message}) => {
    if(!message) return null;

    return(
        <div className="error-class">
            <div className="centered-element">
                <strong>Oups! </strong> {message}
            </div>
        </div>
    );
};

export default ErrorHandle;