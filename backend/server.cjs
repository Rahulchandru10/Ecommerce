const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const signup = require('./controller/authRoutes/Signup')
const signin = require('./controller/authRoutes/Signin')
const pd = require('./View/products')
const search = require('./controller/searchRoutes/search')

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json())

app.use('/auth/signup',signup)
app.use('/auth/signin',signin)
app.use('/view/products',pd)
app.use('/search',search)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
