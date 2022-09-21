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


  return (
    <main className='showings'>
      <ShowingSelector date={chosenDate} updateDate={updateDate} />
      {showings.length > 0 && showings.map((item: any) => {
        return (
          <ShowingItem
            key={item.id}
            id={item.id}
            title={item.title}
            desc={item.overview}
            poster={item.poster}
            backdrop={item.backdrop}
            showings={item.showings}
            date={chosenDate}
          />
        )
      })}
    </main>
  )
}

export default Showings