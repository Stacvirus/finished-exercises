import { useState } from "react";

function Search(props) {
  const [changeVal, setVal] = useState("")
  function handleInputs(e) {
    const { value } = e.target;
    setVal(value)
    return props.handleSearch(value)
  }
  return (
    <input type="search" onChange={handleInputs} value={changeVal} />
  )
}

export default Search;