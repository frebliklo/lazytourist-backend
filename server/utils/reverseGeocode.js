const axios = require('axios')

const { GOOGLE_GEOCODE_API_KEY } = require('../config/keys')

const reverseGeocode = (lat,lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_API_KEY}`

  return new Promise((resolve,reject) => {

    axios.get(url)
      .then(res => {
        const { address_components, formatted_address } = res.data.results[0]

        const countryComponents = address_components.find(element => element.types[0] === 'country') 
        const stateComponents = address_components.find(element => element.types[0] === 'administrative_area_level_1')

        const country = {
          shortName: countryComponents.short_name,
          longName: countryComponents.long_name
        }

        let state = {}

        if(stateComponents) {
          state = { shortName: stateComponents.short_name, longName: stateComponents.long_name }
        } else {
          state = { shortName: 'Couldn\'t find state', longName: 'Couldn\t find state' }
        }

        const data = {
          country,
          state,
          formattedAddress: formatted_address
        }

        resolve(data)
      })
      .catch(err => reject(err))
  })
}

module.exports = { reverseGeocode }
