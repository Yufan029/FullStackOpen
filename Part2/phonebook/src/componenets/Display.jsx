import Header from "./Header"
import Person from "./Person"

const Display = ({ title, persons, handleDelete }) => {
  return (
    <>
      <Header title={title} />
      <ul>
        {persons.map(p => <Person 
            key={p.id}
            name={p.name}
            number={p.number}
            handleDelete={() => handleDelete(p.id, p.name)} />)}
      </ul>
    </>
  )
}

export default Display