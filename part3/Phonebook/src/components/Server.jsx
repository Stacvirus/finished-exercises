import axios from 'axios'
// const url = 'http://localhost:3001/persons'
const url = '/api/persons'

async function getData() {
    const res = await axios.get(url)
    return res.data
}

async function postData(person) {
    try {
        const res = await axios.post(url, person)
        return res
    } catch (error) {
        return error
    }
}

async function delData(id) {
    const res = await axios.delete(`${url}/${id}`)
    return res
}

async function updateData(id, person) {
    console.log(id)
    try {
        const res = await axios.put(`${url}/${id}`, person)
        return res
    } catch (error) {
        return error
    }
}

export default { getData, postData, delData, updateData }