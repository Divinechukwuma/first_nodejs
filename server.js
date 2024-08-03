const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandlers = require('./middleware/errorhandlers');
const PORT = process.env.PORT || 3500;
const corsOptions = require("./config/corsOptions");

//log events function 
app.use(logger)

app.use(cors(corsOptions));

//built in middleware to handle urlencoded data ,in other words, form data:
app.use(express.urlencoded({ extended: false }));

//built in middle ware for json 
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'))
app.use('/employees', require('./routes/api/employees'));


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
