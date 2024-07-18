const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };

//initialize object 
const myEmitter = new Emitter();






// myEmitter.on('log', (msg) => logEvents(msg)); //this is how you listen to an event 
// myEmitter.emit('log', 'log event emitted!',);
