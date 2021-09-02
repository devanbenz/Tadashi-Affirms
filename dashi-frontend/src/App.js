import React, {useState, useEffect} from 'react'
import './App.css'
import TitleBar from './components/TitleBar'
import { getAll, upload } from './service/photoService'
const s3base = `https://tadashi-img-bucket.s3.amazonaws.com/`

const App = () => {
  const [name, setName] = useState('')
  const [photos, setPhotos] = useState([])
  const [selectedFile, setFile] = useState(null)

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
  useEffect(() => {
    ;(async () => {
      let picArr = []
      try{
        const pics = await getAll()
        pics.Contents.map(x => picArr.push(x.Key))
        setPhotos(picArr)
      }catch(e){
        console.log('no photos')
      }
    })()
  },[])

  const getFile = (e) => {
    setFile(e.target.files[0])
  }

  const uploadFile = (e) => {
    e.preventDefault()
    try{
      upload(selectedFile)
      setFile(null)
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

  return (
    <div>
      <TitleBar name={name} />
      <form encType='multipart/form-data'>
        <input type='file' name='photo' onChange={getFile}></input>
        <button onClick={uploadFile} >upload</button>
      </form>
      {photos.map(x => <img className='sml' key={x} src={s3base+x} />)}
    </div>
  )
}

export default App