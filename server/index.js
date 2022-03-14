import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import postsRouters from './routers/posts.js'
import productsRouters from './routers/products.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('SUCCESS')
})

app.use('/posts', postsRouters)

app.use('/products', productsRouters)

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB')

        app.listen(PORT, () => {
            console.log(`server on running port ${PORT}`)
        })

    }).catch((err) => {
        console.log('err', err)
    })
// mongoose.set('useFindAndModify', false)