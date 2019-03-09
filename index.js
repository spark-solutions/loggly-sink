const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const authentication = (req, res, next) => {
  const token = (req.headers.authorization || '').split(' ')[1]

  if (!token || token !== process.env.TOKEN) {
    res.sendStatus(401)
    return
  }

  next()
}

app.use(authentication)
app.use(bodyParser.text({ type: '*/*' }))

app.post('/', (req, res) => {
  setImmediate(() => { console.log(req.body) })

  res.sendStatus(204)
})

app.listen(process.env.PORT || 3000)
