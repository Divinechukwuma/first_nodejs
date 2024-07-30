const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandlers = require('./middleware/errorhandlers');
const PORT = process.env.PORT || 3500;

//log events function 
app.use(logger)

//cross origin resource sharing 
// white list is a list of accepted domains that cors will have access to the backend data and after development make sure u remove it and the development domains 

const whitelist = ['http://www.divinerules.com', 'http://127.0.01:5500', 'http://localhost:3500',];
const corsOptions = {
    origin: (origin, callback) => {
        //during development add the no origin so u can excape the cores error of being undefinedand and  after development make sure u remove it and the development domains 
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            //THE FIRST SECTION ALWAYS NORMALLY STAND SFOR THE RROR SO THIS THIS IS SAYING IS IF THERE IS NO ERROR THEN THE FUNCTION IS TURE SO IT SHOULD RUN 
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: applicatione/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built in middle ware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

app.use('/subdir', require('./routes/subdir'));

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

//app.use is mostly used for middleware and app.ll is mostly used for routing it means it will ba applied to all http methods or requests


app.get('/chain(.html)?', [one, two, three])

app.all('*', (req, res) => {
    res.status('404');
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found" });
    } else {
        req.type('txt').send('404 not found');
    }

})

app.use(errorHandlers);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
