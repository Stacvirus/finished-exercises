function Header({ header }) {
  return (
    <h1>{header}</h1>
  )
}

function Content({ parts }) {
  return (
    <div>
      <Part part={parts[0].name} exo={parts[0].exercises} />
      <Part part={parts[1].name} exo={parts[1].exercises} />
      <Part part={parts[2].name} exo={parts[2].exercises} />
    </div>
  )
}

function Part({ part, exo }) {
  return (
    <p>{part} {exo}</p>
  )
}

function Total({ exo1, exo2, exo3 }) {
  return (
    <p>Number of exercises {exo1 + exo2 + exo3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total exo1={course.parts[0].exercises} exo2={course.parts[1].exercises} exo3={course.parts[2].exercises} />
    </div>
  )
}

export default App