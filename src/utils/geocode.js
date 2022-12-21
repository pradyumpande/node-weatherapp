const request=require('request')


const geocode=(address,callback)=>{
    const url1='https://api.geoapify.com/v1/geocode/search?text='+encodeURIComponent(address)+'&apiKey=44bb726b86c34267ae1a2416bdb32bd1'
    request({url: url1,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services!',undefined)
        }else if(response.body.features.length==0){
            callback('Check location again!,try another Search.',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].bbox[0],
                longitude:response.body.features[0].bbox[1],
                location: response.body.features[0].properties.formatted
            })
        }
    })
}

module.exports=geocode