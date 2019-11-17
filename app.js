const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT||3000
const geocode = require('/utilits/geocode')
const forecast = require('/utilits/forecast')
//defining paths for express 
const publicdirectorypath = path.join(__dirname,'/public')
const viewspath = path.join(__dirname,'/templates/views')
const partialpaths = path.join(__dirname,'/templates/partials')

app.set('view engine','hbs')
//point express to custom template directory
app.set('views',viewspath)
//imp
hbs.registerPartials(partialpaths)
//this for static files
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather App',
        'name':'Sahil'
    })
})

app.get('/help',(req,res)=>{
 res.render('help',{
     'title':'Help',
     'name':'sahil',
     'message':'This is the help page'
 })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            'error':'you must enter the address'
        })
    }
    geocode(req.query.address,(error,data={})=>{
        if(error){
           return res.send({
             'error':error  
           })
        }
         forecast(data.latitude,data.longitude,(error,data)=>{
           if(error){
             return res.send({
                 'error':error
             })
           }
           res.send({
            'forecast':data,
            'address':req.query.address
        })
        })
     })
  
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        'title':'404',
        'name':'sahil',
        'errormessage':'help page not found'
    })
  })
 
app.get('*',(req,res)=>{
  res.render('404',{
      'title':'404',
      'name':'sahil',
      'errormessage':'page not found'
  })
})
//local host
// app.listen(3000,()=>{
//     console.log('server has fire up')
// })
app.listen(port,()=>{
    console.log('server has fire up')
})
