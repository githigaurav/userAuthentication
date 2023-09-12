const mongoose = require("mongoose")
// const URL=`mongodb://127.0.0.1:27017/${process.env.DBNAME}`
const DBURL=`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@server.ln65acq.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(DBURL)
.then(()=>{
    console.log("db Connection established")

})
.catch((error)=>{
    console.log(error)
})


