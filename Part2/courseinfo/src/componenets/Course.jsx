const Course = ({ course }) => {
  const total =course.parts.reduce((acc, cur) => acc + cur.exercises, 0);
  
  return (
    <>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({ part }) => <div>{part.name} {part.exercises}</div>
const Total = ({ total }) => <h3>total of {total} exercises</h3>

export default Course