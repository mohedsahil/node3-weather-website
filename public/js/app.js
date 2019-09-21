
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')


weatherform.addEventListener('submit',(e)=>{
//prevent from refresh
e.preventDefault()
const location = search.value
msg1.textContent='Loading....'
msg2.textContent='' 
//local host
//const url = 'http://localhost:3000/weather?address='+location+''
const url = '/weather?address='+location+''
fetch(url).then((response)=>{       
response.json().then((data)=>{
    if(data.length==0){
        msg1.textContent = 'please enter the location'
    }
    if(data.error){
        msg1.textContent = data.error
    }
    else{
        msg1.textContent = data.address
        msg2.textContent = data.forecast
    }
})
})
})