const fs = require('fs');
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname,'files','lorem.txt'),'utf8');

const ws = fs.createWriteStream(path.join(__dirname,'files','new_lorem.txt'));

//one way to tranfer text frome files

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

//a simpler way
rs.pipe(ws);