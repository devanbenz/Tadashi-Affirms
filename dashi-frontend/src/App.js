import React, {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './App.css'
import TitleBar from './components/TitleBar'
import Upload from './components/Upload'
import { getAll, upload } from './service/photoService'
const s3base = `https://tadashi-img-bucket.s3.amazonaws.com/`


const App = () => {
  const [name, setName] = useState('')
  const [photos, setPhotos] = useState([])
  const [selectedFile, setFile] = useState(null)
  const {isAuthenticated} = useAuth0()
  
  //async/await method for getting photos
  const getPhotos = async () => {
    let picArr = []
    try{
      const pics = await getAll()
      pics.Contents.map(x => picArr.push(x.Key))
      setPhotos(picArr)
    }catch(e){
      console.log('no photos')
    }
  }

  const nickNames = [
    'Ning sa baby', 'Tarduncle',
    'Tarunchy Crunch',  'Tadashi',
    'Dashiki', 'Tada!'
  ]


  // useEffect to randomly get nickname out of names :)
  useEffect(() => {
    setName(nickNames[Math.floor(Math.random()*nickNames.length)])
  }, [])

  // creates an array of object keys from S3 bucket then pushes that to photos state
  // This just initially grabs 
  useEffect(() => {
    getPhotos()
  },[])

  const getFile = (e) => {
    setFile(e.target.files[0])
  }

  const uploadFile = (e) => {
    e.preventDefault()
    try{
      upload(selectedFile)
      setFile(null)
      
      // Fetch updated photos from s3 bucket
      setTimeout(() => {
        getPhotos()
      },4000)

    }catch(e){
      console.log(e)
    }
  }

  if(name === ''){
    return (
      <div>
        Loading...
      </div>
    )
  }
  console.log(isAuthenticated)

  return (
    <div>
      <TitleBar name={name} />
      {isAuthenticated && <Upload getFile={getFile} uploadFile={uploadFile} />}
      {photos.map(x => <img className='sml' key={x} src={s3base+x} />)}
    </div>
  )
}

export default App