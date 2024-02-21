function Header({ header }) {
    return (
        <h2>{header}</h2>
    )
}

function Content({ parts }) {
    return (
        <div>
            {
                parts.map((part, key) => <Part key={key} part={part.name} exo={part.exercises} />)
            }
        </div>
    )
}

function Part({ part, exo }) {
    return (
        <p>{part} {exo}</p>
    )
}

function Total({ exos }) {
    const init = 0
    const sum = exos.reduce((s, p) => s + p.exercises, init)
    return (
        <h4>Total of {sum}</h4>
    )
}

function Course({ course }) {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total
                exos={course.parts}
            />
        </div>
    )
}

export default Course