const request=require('request')


const forcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=582c1a97a51a3cb8b433ea5663b11de1&query='+longitude+','+latitude+'&unit=m'
    request({url,json:true},(error,{body})=>{
            if(error){
                callback('unable to connect to weather service',undefined)
            }
            else if(body.error){
                callback('Unable to find location ',undefined)
            }
            else{
                callback(undefined,
                    // weather_Description:response.body.current.weather_descriptions ,
                    // temperature:response.body.current.temperature,
                    // feelslike:response.body.current.feelslike,
                    // At_Time:response.body.current.observation_time
                    body.current.weather_descriptions+' .It is currently '+body.current.temperature+' degrees out.It feels like '+body.current.feelslike+' degrees.At '+body.current.observation_time
                )
            }
    })
}

module.exports=forcast