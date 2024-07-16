const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {

    //THE better way to read,write,append and rename file 

    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), data);
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promisewrite.txt'), '\n\nyes i am happy to meet you');
        await fsPromises.rename(path.join(__dirname, 'files', 'promisewrite.txt'), path.join(__dirname, 'files', 'promisecomplete.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promisecomplete.txt'), 'utf8');
        console.log(newData);

    } catch (err) {
        console.error(err);
    }

}

fileOps();

//one way to read,write,append and rename file 

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'you will go far in life', (err) => {
//     if (err) throw err;
//     console.log('write complete');

//     // this is used to append an existing file the content inside the file an dit can alseo create new files
//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nyes it is.', (err) => {
//         if (err) throw err;
//         console.log('Append complete');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete');
//         })

//     })

// })


//exit on uncaught error

process.on('uncaughtException', err => {
    //to use ${} require backticks `` not quotes '' ""
    console.error(`there was an uncaught error: ${err}`);
    process.exit(1);
})