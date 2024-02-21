import axios from 'axios'
const url = 'http://localhost:3001/persons'

async function getData() {
    const res = await axios.get(url)
    return res.data
}

async function postData(person) {
    const res = await axios.post(url, person)
    return res.data
}

async function delData(id) {
    const res = await axios.delete(`${url}/${id}`)
    return res
}

async function updateData(id, person) {
    console.log(id)
    const res = await axios.put(`${url}/${id}`, person)
    return res.data
}

export default { getData, postData, delData, updateData }