const express = require('express');
const  path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app =express();

//conectividad
mongoose.connect('mongodb://localhost/crud-nodejs')
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));

//importing routes
const indexRoutes = require('./routes/index');


app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//routes 
app.use('/', indexRoutes);

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
});
