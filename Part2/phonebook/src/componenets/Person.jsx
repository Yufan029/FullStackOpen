const Person = ({name, number, handleDelete}) =>{
    return (
        <li>
            <div>
                {name} {number}
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

export default Person