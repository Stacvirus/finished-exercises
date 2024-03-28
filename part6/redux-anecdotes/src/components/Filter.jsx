import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

function Filter() {
    const dispatch = useDispatch()
    const style = { marginBottom: '10px' }
    const search = { fontWeight: 'bold' }

    return (
        <div style={style}>
            <span style={search}>filter</span> <input
                type="search"
                name="search"
                onChange={({ target }) => dispatch(filterChange(target.value))}
            />
        </div>
    )
}

export default Filter