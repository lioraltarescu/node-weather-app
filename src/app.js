const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','hbs')
app.set('views',viewPath)

hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        title: 'weather',
        name: "Lior"
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }

    geocode (req.query.address, (error,{latitude,longtitude,location} = {}) => {
        if (error) {
            return res.send({error : error})
        }
        forecast(latitude ,longtitude, (error, forcastdata) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({
                forecast: forcastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'help me',
        name: 'Lior'
    })
})

app.get('/help/*', (req,res) => {
    res.render('pageNotFound',{
        title: 'help not found',
        name: 'Lior',
        error: 'Help article not found'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'about me',
        name: 'Lior'
    })
})

app.get('*', (req,res) => {
    res.render('pageNotFound',{
        title: '404',
        name: 'Lior',
        error: 'page not found'
    })
})


app.listen(port, () => {
    console.log('server is up on port ' + port)
})