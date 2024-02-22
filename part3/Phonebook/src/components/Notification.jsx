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

export default Notification