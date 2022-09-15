import { useState, useEffect } from 'react'
import ShowingItem from './ShowingItem'
import ShowingSelector from './ShowingSelector'

function Showings() {
  let todayDate: Date = new Date()
  const todayStr: string = `${todayDate.getFullYear()}-${padDate(todayDate.getMonth() + 1)}-${padDate(todayDate.getDate())}`

  const [showings, setShowings] = useState<any[]>([])
  const [chosenDate, setChosenDate] = useState(todayStr)

  useEffect(() => {
    fetchShowings()
  }, [chosenDate])

  async function fetchShowings() {
    const res = await fetch(`/api/movie/showings?date=${chosenDate}`)
    const data = await res.json()
    setShowings(data)
  }

  function updateDate(date: string) {
    setChosenDate(date)
  }

  // Add leading 0 to date if needed
  function padDate(date: number) {
    return ('0' + date).slice(-2)
  }

  // Only render 10 movies
  let showingItems: JSX.Element[] = []
  const limit = 10
  if (showings.length > 0) {
    for (let i = 0; i < limit; i++) {
      showingItems.push(
        <ShowingItem
          key={showings[i].id}
          id={showings[i].id}
          title={showings[i].title}
          desc={showings[i].overview}
          poster={showings[i].poster}
          backdrop={showings[i].backdrop}
          showings={showings[i].showings}
          date={chosenDate}
        />
      )
    }
  }

  return (
    <main className='showings'>
      <ShowingSelector date={chosenDate} updateDate={updateDate} />
      {showingItems}
    </main>
  )
}

export default Showings