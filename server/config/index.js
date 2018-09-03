const env = process.env.NODE_ENV || 'development'

if(env === 'development') {
  process.env.PORT = 4000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TouristApi'
} else if(env === 'test') {
  process,env.PORT = 4001
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TouristApiTest'
}
