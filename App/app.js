const redis = require('redis')
const client = redis.createClient({
    host: 'redis',
    port: 6379
})
client.on('error', (e) => console.log(e))

const express = require('express')
const app = express()
app.get('/', (res, resp) => {
    client.get('count', (e, value) => {
        value = (value ? parseInt(value)+1 : 0).toString()
        client.set('count', value)
        resp.send(value)
    })
})
app.listen(3000)