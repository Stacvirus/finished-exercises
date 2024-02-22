import { useState } from "react"

function PersonForm({ submitPerson }) {
    const [personInfos, setPersonInfos] = useState({ name: '', number: '' })

    function handleChange({ target }) {
        const { value, name } = target
        setPersonInfos({ ...personInfos, [name]: value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        submitPerson(personInfos)
        setPersonInfos({ name: '', number: '' })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>add a new</h2>
            <div>
                name: <input
                    type='text'
                    value={personInfos.name}
                    name='name'
                    onChange={handleChange}
                />
            </div>
            <div>
                number: <input
                    type='text'
                    value={personInfos.number}
                    name='number'
                    onChange={handleChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm