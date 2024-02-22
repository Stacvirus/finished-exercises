import { useState } from "react"

function Person({ del, per }) {
    function handleDel() {
        del(per)
    }
    return (
        <p key={per.id} className='normal'>{per.name} {per.number} <button onClick={handleDel}>delete</button></p>
    )
}

function Persons({ searchValue, persons, filteredPersons, del }) {

    function deletePerson(e) {
        del(e)
    }

    return (
        <div>
            {
                !searchValue && persons.map((per, id) => <Person per={per} del={deletePerson} key={id} />)
            }
            {
                searchValue !== '' && filteredPersons.map((per, id) => <Person key={id} per={per} del={deletePerson} />)
            }
        </div>
    )
}

export default Persons