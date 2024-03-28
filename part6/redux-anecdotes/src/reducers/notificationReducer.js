import { createSlice } from "@reduxjs/toolkit"

let initialState = ''

const notSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            if (action.payload == undefined) {
                return ''
            }
            // return {
            //     content: action.payload.name,
            //     type: action.payload.sender
            // }
            return { ...action.payload, delay: action.payload.delay * 1000 }
        },
        removeNotification(state, action) {
            return ''
        }
    },
})

export const { removeNotification, displayNotification } = notSlice.actions

export function setNotification(text, delay) {
    return dispatch => {
        dispatch(displayNotification({ text, delay }))
    }
}

export default notSlice.reducer