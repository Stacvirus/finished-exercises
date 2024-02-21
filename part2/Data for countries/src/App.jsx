import { useEffect, useState } from 'react'
import Search from './Input'
import dataServer from './Fetching'
import Details from './Details'
import Para from './Output'

function findMatches(word, dataBase) {
  const regex = new RegExp(word, "gi")
  let ans = dataBase.filter(element => element.name.common.match(regex))
  return ans
}

function App() {
  const [ans, setAns] = useState([])
  const [list, setList] = useState(null)
  useEffect(() => {
    dataServer.getCountry()
      .then(resp => {
        setList(resp)
        // console.log(list, "fuck")        
      })
  }, [])

  function handleSearch(value) {
    if (!value) {
      setAns([])
      return
    }
    const country = findMatches(value, list)
    setAns(country)
  }

  
  return (
    <div>
      <Search handleSearch={handleSearch} />
      {ans.map((res, id) => {
        ans.length > 10 && setAns([{ name: { common: "please be more specific" } }])
        return(
          ans[1] || res.name.common == "please be more specific" ? <Para responce={res} key={id}/> : <Details country={res} key={id}/>

        )
      })}
    </div>
  )
}

export default App

