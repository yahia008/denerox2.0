const mongose = require("mongoose")


const connectDB = async () => {
    try{
        await mongose.connect(process.env.ACCESS_URL)
        console.log('mongose connected 😎')
        
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }

}

module.exports = connectDB
