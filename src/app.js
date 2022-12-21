const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')

const app=express()
const port=process.env.PORT || 3000
//Define paths for Express config
const publicdirectorypath = path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)
//setup static directiory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pradhumn Pande'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: ' You must provide the Address'
        })
    }else
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        
        }
            forcast(latitude,longitude,(error,forcastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forcast:forcastData,
                    location,
                    address:req.query.address
                })
                console.log(location)
                console.log(forcastData)
                
        })
        
        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
        })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Pradhumn Pande'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:"Pradhumn Avinash Pande",
        title:'Help',
        name:'Pradhumn Pande'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"pradhumn pande",
        errorMessage:'HElp article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
       title:'404',
       name:'Pradhumn Pande',
       errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})