import React, {useState, useEffect} from 'react'
import LoginForm from './components/LoginForm'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import TitleBar from './components/TitleBar'

const App = () => {
  const [name, setName] = useState('')

  const nickNames = [
    'Ning sa baby', 'Tarduncle',
    'Tarunchy Crunch',  'Tadashi',
    'Dashiki', 'Tada!'
  ]

  // useEffect to randomly get nickname out of names :)
  useEffect(() => {
    setName(nickNames[Math.floor(Math.random()*nickNames.length)])
  }, [])

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