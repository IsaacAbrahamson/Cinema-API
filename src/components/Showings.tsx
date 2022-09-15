import { useState, useEffect } from 'react'
import ShowingItem from './ShowingItem'

function Showings() {
  let todayDate: Date = new Date()
  const todayStr: String = `${todayDate.getFullYear()}-${padDate(todayDate.getMonth() + 1)}-${padDate(todayDate.getDate())}`

  const [showings, setShowings] = useState<any[]>([])
  const [chosenDate, setChosenDate] = useState(todayStr)

  useEffect(() => {
    fetchShowings()
  }, [])

  async function fetchShowings() {
    const res = await fetch(`/api/movie/showings?date=${chosenDate}`)
    const data = await res.json()
    setShowings(data)
  }

  // Add leading 0 to date if needed
  function padDate(date: number) {
    return ('0' + date).slice(-2)
  }

  const showingElems = showings.map(e => {
    return (
      <ShowingItem
        id={e.id}
        title={e.title}
        desc={e.overview}
        poster={e.poster}
        backdrop={e.backdrop}
        showings={e.showings}
      />
    )
  })

  return (
    <div>
      {showingElems}
    </div>
  )
}

export default Showings