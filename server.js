const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const app = express();
const PORT = process.env.port || 3500;

//built in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: applicatione/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middle ware for json 
app.use(express.json());

////serve static files
app.use(express.static(path.join(__dirname, '/public')));

app.use(logger)

app.get('^/$|index(.html)?', (req, res) => {
    //res.sendFile('./view/index.html',(root: __dirname)); 
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html');
})

//ROUTE HANDLERS AND CHAINS FUNCTIONS 

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
}, (req, res) => {
    res.send('hello world!')
})

//another way to chain functions chaning in an array 
const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('finished!');
}

app.get('/chain(.html)?', [one, two, three])

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


app.listen(PORT, () => console.log(`server running on ${PORT}`));
