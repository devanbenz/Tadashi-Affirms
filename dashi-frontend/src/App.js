import React, {useState, useEffect} from 'react'
import './App.css'
import TitleBar from './components/TitleBar'
import { getAll } from './service/photoService'

const App = () => {
  const [name, setName] = useState('')
  const [photos, setPhotos] = useState({})

  const nickNames = [
    'Ning sa baby', 'Tarduncle',
    'Tarunchy Crunch',  'Tadashi',
    'Dashiki', 'Tada!'
  ]

  // useEffect to randomly get nickname out of names :)
  useEffect(() => {
    setName(nickNames[Math.floor(Math.random()*nickNames.length)])
  }, [])

  useEffect(() => {
    ;(async () => {
      const pics = await getAll()
      console.log(pics)
    })()
  },[])

  if(name === ''){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      <TitleBar name={name} />
    </div>
  )
}

export default App