const weatherform = document.querySelector('form')
const searchelement=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')

 //msg1.textContent = 'From JavaScript'

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=searchelement.value
   
        msg1.textContent='Loading...'
        msg2.textContent=''
    {
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
       msg1.textContent= data.error
    }else{
        msg1.textContent= data.location
        msg2.textContent= data.forcast
    }
    
})
})
    }
})
