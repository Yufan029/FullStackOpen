import Header from "./Header"
import Input from "./Input"

const AddNewPerson = ({ 
  title,
  newName,
  handleInputChange,
  phoneNumber,
  handlePhoneNumberChange,
  handleSubmit}) => {
  return (
    <>
      <Header title={title} />
      <form onSubmit={handleSubmit}>
        <Input text='name' value={newName} onChange={handleInputChange} />
        <Input text='number' value={phoneNumber} onChange={handlePhoneNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default AddNewPerson