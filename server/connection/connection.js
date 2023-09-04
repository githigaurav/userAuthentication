const mongoose = require("mongoose")
const URL="mongodb://127.0.0.1:27017/userAuthentication"
mongoose.connect(URL)
.then(()=>{
    console.log("db Connection established")

})
.catch((error)=>{
    console.log(error)
})


