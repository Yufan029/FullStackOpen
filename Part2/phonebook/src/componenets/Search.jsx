import Header from "./Header"
import Input from "./Input"

const Search = ({ title, text, value, onChange}) => {
  return (
    <>
      <Header title={title} />
      <Input text={text} value={value} onChange={onChange} />
    </>
  )
}

export default Search