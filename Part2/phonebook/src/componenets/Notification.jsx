const Notification = ({ message, hasError }) => {
    if (message === null) {
        return null
    }
    
    return (
        <div className={hasError? 'errorMsg' : 'notifyMsg'}>
            {message}
        </div>
    )
}

export default Notification