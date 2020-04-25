const request=require('request')

const forecast = (lang,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f5cc2bcb96ef0598a1cf8134804b1413&query='+lang+','+long+'&units=m'

    request({ url,json: true }, (error, {body}) => {
        if (error) {
            callback(error,undefined)
        } else if (body.error) {
            callback('error in url ',undefined)
        } else {
            callback(undefined,'the temperture is '+ body.current.temperature + ' but it feels like ' + body.current.feelslike)
        }
        
    })
}

module.exports = forecast