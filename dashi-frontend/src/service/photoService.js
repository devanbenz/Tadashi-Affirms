const getAll = async () => {
    try{
        const req = await fetch('/api/photos',{
            headers:{'Content-Type':'application/json'}
        })
        if(!req.ok){
            throw Error
        }
        return req.json()
    }catch(e){
        console.log(e)
    }
}

const upload = async (fileToUpload) => {
    try{
        const formData = new FormData()
        formData.append('file', fileToUpload)
        const req = await fetch('/api/photos', {
            method: 'POST',
            body: formData
        })
        if (!req.ok){
            throw Error
        }
        return req
    }catch(e){
        console.log(e)
    }
}

module.exports ={
    getAll,
    upload
}