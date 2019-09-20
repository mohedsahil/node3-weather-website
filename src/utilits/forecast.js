const request = require('request')

const forecast = (lattitude,logitude,callback)=>{
const url = 'https://api.darksky.net/forecast/a8a9f90655155eacef8873b5a2a3c4af/'+lattitude+','+logitude+'' 
request({url:url,json:true},(error,response)=>{
    if(error){
       callback('unable to connect the internet',undefined) 
    }
    else if(response.body.error){
        callback('unable to find the location',undefined)
    }
    else{
        callback(undefined,response.body.hourly.data[0].summary)
    } 
 })
}
module.exports = forecast
