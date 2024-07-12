const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'you will go far in life', (err) => {
    if (err) throw err;
    console.log('write complete');

    // this is used to append an existing file the content inside the file an dit can alseo create new files
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nyes it is.', (err) => {
        if (err) throw err;
        console.log('Append complete');

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('Rename complete');
        })

    })

})


//exit on uncaught error

process.on('uncaughtException', err => {
    //to use ${} require backticks `` not quotes '' ""
    console.error(`there was an uncaught error: ${err}`);
    process.exit(1);
})