import { useEffect, useState } from 'react'
import serverServices from './components/Server'

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

function PersonForm({ submitPerson }) {
  const [personInfos, setPersonInfos] = useState({ name: '', number: '' })

  function handleChange({ target }) {
    const { value, name } = target
    setPersonInfos({ ...personInfos, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitPerson(personInfos)
    // setPersonInfos({ name: '', number: '' })
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

function Notification({ text, clr }) {

  const notStyles = {
    border: `3px solid {clr}`,
    borderRadius: '10px',
    color: clr,
    background: 'gray',
    padding: '10px'
  }
  return (
    <h2 style={notStyles}>
      {text}
    </h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [searchValue, setSearchValue] = useState('')
  const [filteredPersons, setFilteredPersons] = useState('')

  const [notParams, setNotParams] = useState()


  useEffect(() => {
    serverServices.getData()
      .then(res => setPersons(res))
  }, [])

  function isExist(person) {
    let ans = null
    persons.filter(per => {
      console.log(per.name)
      if (per.name === person.name) {
        console.log(per.name)
        if (per.number !== person.number) ans = per
        else ans = true
      } else ans = false
    })
    return ans
  }

  async function handleSubmit(personInfos) {
    const result = isExist(personInfos)

    if (result === true) {
      return alert(`${personInfos.name} is already added to phonebook`)
    } else if (typeof (result) === 'object' && window.confirm(`${personInfos.name} is already in the phone book, replace the old number with the new one?`)) {
      const newObject = { name: personInfos.name, number: personInfos.number }
      let newPersons = null
      try {
        await serverServices.updateData(result.id, newObject)
        newPersons = await serverServices.getData()
        setNotParams({ text: `${personInfos.name} number modified`, clr: 'green' })
        hideNotification()
      } catch (error) {
        setNotParams({ text: `Information of ${personInfos.name} has already been removed from server`, clr: 'red' })
        return hideNotification()
      }
      return setPersons(newPersons)
    }
    let personData = null

    try {
      personData = await serverServices.postData(personInfos)
      setPersons(persons.concat(personData))
      setNotParams({ text: `Added ${personInfos.name}`, clr: 'green' })
      hideNotification()
    } catch (error) {
      setNotParams({ text: `Information of ${personInfos.name} has already been removed from server`, clr: 'red' })
      hideNotification()
    }
  }

  function search(e) {

    setSearchValue(e)
    const regex = new RegExp(e)
    setFilteredPersons(persons.filter(per => per.name.match(regex)))
  }

  async function handleDelete(per) {
    try {
      window.confirm(`Delete ${per.name} ?`) && await serverServices.delData(per.id)
      const data = await serverServices.getData()
      setPersons(data)
    } catch (error) {
      setNotParams({ text: `Information of ${per.name} has already been removed from server`, clr: 'red' })
      hideNotification()
    }
  }

  function hideNotification() {
    setTimeout(() => {
      setNotParams()
    }, 3000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notParams !== undefined && <Notification text={notParams.text} clr={notParams.clr} />}
      <Filter search={search} />
      <PersonForm submitPerson={handleSubmit} />
      <h2>Numbers</h2>
      <Persons del={handleDelete} searchValue={searchValue} persons={persons} filteredPersons={filteredPersons} />
    </div>
  )
}

export default App