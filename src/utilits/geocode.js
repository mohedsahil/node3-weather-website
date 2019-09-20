const request = require('request')

const geocode = (address,callback)=>{
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FoaWxtaCIsImEiOiJjazBsY3Y3czAwc2l2M2JsaXU5NzN6end5In0.Iz65R7-6zdV4zF88QHHdvw'
    request({url:geocodeurl,json:true},(error,response)=>{
       if(error){
          callback('unable to connect the internet',undefined)
       }
       else if(response.body.features.length==0){
          callback('location not found',undefined)
       }else{
          callback(undefined,{
             latitude:response.body.features[0].center[1],
             longitude:response.body.features[0].center[0],
             location:response.body.features[0].place_name
          })
       }
 
    }) 
 }

 module.exports = geocode