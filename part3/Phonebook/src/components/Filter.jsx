import { useState } from "react"

function Filter({ search }) {
    const [Value, setValue] = useState()
    function handleFilterChange({ target }) {
        const value = target.value
        setValue(value)
        search(value)
    }

    return (
        <div>
            filter shown with <input
                type="search"
                value={Value}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter