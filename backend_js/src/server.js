//constants
const PORT = process.env.PORT

// import app
const app = require('./app').app

app.listen(PORT || 3000)
