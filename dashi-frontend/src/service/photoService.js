const getAll = async () => {
    try{
        const req = await fetch('/api/photos',{headers:{'Content-Type':'application/json'}})
        if(!req.ok){
            throw Error
        }
        return req.json()
    }catch(e){
        console.log(e)
    }
}

module.exports ={
    getAll
}