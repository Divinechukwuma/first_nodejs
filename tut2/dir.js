const fs = require('fs');

//how to make and check for dir

if (!fs.existsSync('./new')){
    fs.mkdir('./new',(err) => {
        if(err) throw(err);
        console.log('Directory created')
    })
}

//how to delete dir

if (fs.existsSync('./new')){
    fs.rmdir('./new',(err) => {
        if(err) throw(err);
        console.log('Directory removed ')
     })
}