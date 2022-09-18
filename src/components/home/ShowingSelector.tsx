import { useState } from 'react'
import ShowingSelectorDay from './ShowingSelectorDay'

interface Day {
  id: number,
  name: string
  date: string
}

function ShowingSelector(props: any) {
  const [activeDay, setActiveDay] = useState(0)

  function updateDay(id: number, date: string) {
    setActiveDay(id)
    props.updateDate(date)
  }

  // Create an array with the days of the week from today
  const today: Date = new Date()
  let days: Day[] = []

  // Get the name of every day for next 5 days
  for (let i = 0; i < 5; i++) {
    let nextDay: Date = new Date(today)
    nextDay.setDate(nextDay.getDate() + i)
    days.push({
      id: i,
      name: nextDay.toLocaleString('en-us', { weekday: 'long' }).slice(0, 3),
      date: `${nextDay.getFullYear()}-${padDate(nextDay.getMonth() + 1)}-${padDate(nextDay.getDate())}`
    })
  }
  days[0].name = 'Today'

  // Add leading 0 to date if needed
  function padDate(date: number) {
    return ('0' + date).slice(-2)
  }

  const dayElems = days.map(day => {
    return (
      <ShowingSelectorDay
        key={day.id}
        id={day.id}
        active={day.id == activeDay}
        handleClick={updateDay}
        name={day.name}
        date={day.date}
      />
    )
  })

  return (
    < div className="showing-selector" >
      {dayElems}
    </div >
  )
}

export default ShowingSelector