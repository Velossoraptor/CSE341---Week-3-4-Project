const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const PORT = process.env.PORT || 3300;

app.use('/', require("./routes"));

mongodb.initDb((err) =>{
    if(err){
        console.log(err);
    }
    else{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }
});