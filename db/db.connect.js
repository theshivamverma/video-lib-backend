const mongoose = require("mongoose")

async function initializeDBConnection(){
    try{
        const res = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        if(res){
            console.log("DB Connected")
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = { initializeDBConnection }