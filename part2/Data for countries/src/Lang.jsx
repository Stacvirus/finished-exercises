
function Lang(props){
    let langs = []
    for(let key in props.languages){
        langs.push(props.languages[key])      
    }
    
    return(
        <ul>
            {langs.map((res, id) => <li key={id}>{res}</li>)}
        </ul>
    )
}
export default Lang;