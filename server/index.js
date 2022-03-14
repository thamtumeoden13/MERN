import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postsRouters from './routers/posts.js'
import productsRouters from './routers/products.js'

const app = express()
const PORT = process.env.PORT || 5000
const URI = `mongodb+srv://admin:Ee0lqlwcqTzuV4YN@cluster0.aj6ij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('SUCCESS')
})

app.use('/posts', postsRouters)

app.use('/products', productsRouters)

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB')

        app.listen(PORT, () => {
            console.log(`server on running port ${PORT}`)
        })

    }).catch((err) => {
        console.log('err', err)
    })
// mongoose.set('useFindAndModify', false)