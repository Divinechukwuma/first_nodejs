const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};

//initialize object 
const myEmitter = new MyEmitter();

//add listener for log event
myEmitter.on('log', (msg) => logEvents(msg)); //this is how you listen to an event 
 
setTimeout(() => {
    //Emit event
    myEmitter.emit('log','log event emitted!',);
},2000);