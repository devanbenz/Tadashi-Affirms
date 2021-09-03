const Upload = ({getFile, uploadFile}) => {
    return(
    <form encType='multipart/form-data'>
        <input type='file' name='file' onChange={getFile}></input>
        <button className='login-btn' onClick={uploadFile} >upload</button>
    </form>

    )
}

export default Upload
