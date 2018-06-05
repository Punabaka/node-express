const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server', log);
    next()
});

// app.use((req, res, next)=>{
//     res.render('maintance.hbs');
//     next()
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getFullYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res)=>{
    res.send('hello express');
});

app.get('/about',(req, res)=>{
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/home',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home page'
    });
});

app.get('/bad',(req,res)=>{
   res.send({
       data:[
           message='success',
       ],
       errorMessage:'unabe to request'
   })
});

app.listen(3000,()=>{
    console.log('Server is up at port 3000');
});