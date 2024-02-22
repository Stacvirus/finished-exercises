import { useEffect, useState } from 'react'
import serverServices from './components/Server'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

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
      if (per.name === person.name) {
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
        const personData = await serverServices.updateData(result.id, newObject)

        if (!personData.status && personData.response.status === 400) {
          setNotParams({ text: personData.response.data.error, clr: 'red' })
          return hideNotification()
        }

        newPersons = await serverServices.getData()
        setPersons(newPersons)
        setNotParams({ text: `${personInfos.name} number modified`, clr: 'green' })
        hideNotification()
      } catch (error) {
        console.log(error)
        setNotParams({ text: `Information of ${personInfos.name} has already been removed from server`, clr: 'red' })
        return hideNotification()
      }

      return setPersons(newPersons)
    }
    let personData = null

    try {
      personData = await serverServices.postData(personInfos)

      if (!personData.status && personData.response.status === 400) {
        setNotParams({ text: personData.response.data.error, clr: 'red' })
        return hideNotification()
      }

      setPersons(persons.concat(personData.data))
      setNotParams({ text: `Added ${personInfos.name}`, clr: 'green' })
      hideNotification()
    } catch (error) {
      console.log(error)
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
    console.log(per)
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