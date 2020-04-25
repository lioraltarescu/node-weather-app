const request=require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibGlvcmFsIiwiYSI6ImNrOHZxbGZvYjAzdm0zZ3BsMTRiYTcybmgifQ.4NgXzU_9hG_MxuJj0G0B_Q'

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('unable to connect',undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location , try another search')
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode