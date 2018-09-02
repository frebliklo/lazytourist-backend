const axios = require('axios')

const { GOOGLE_GEOCODE_API_KEY } = require('../config/keys')

const reverseGeocode = (lat,lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_API_KEY}`

  return new Promise((resolve,reject) => {
    axios.get(url)
      .then(res => {
        const { address_components, formatted_address } = res.data.results[0]

        const country = address_components.find(element => element.types[0] === 'country') 
        const state = address_components.find(element => element.types[0] === 'administrative_area_level_1')
        
        const data = {
          country: {
            shortName: country.short_name,
            longName: state.long_name
          },
          state: {
            shortName: state.short_name,
            longName: state.long_name
          },
          address: formatted_address
        }

        resolve(data)
      })
      .catch(err => reject('Something went wrong', err))
  })
}

// Testing stuff
// const lat = '40.714224'
// const lng = '-73.961452'

// const testAgain = async (lat,lng) => {
//   const promise = await reverseGeocode(lat,lng)
//   const res = await promise
//   console.log('From inside:',res)
//   return promise
// }

// const test = testAgain(lat,lng)
// console.log('From outside:',test)

module.exports = { reverseGeocode }
