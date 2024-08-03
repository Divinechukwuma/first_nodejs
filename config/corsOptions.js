
//cross origin resource sharing 
// white list is a list of accepted domains that cors will have access to the backend data and after development make sure u remove it and the development domains 
const whitelist = [
    'http://www.divinerules.com',
    'http://127.0.01:5500',
    'http://localhost:3500',
];

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

module.exports = corsOptions;