import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import postsRouters from './routers/posts.js'
import portfolioRouters from './routers/portfolios.js'
import productRouters from './routers/products.js'
import projectRouters from './routers/projects.js'
import projectDetailRouters from './routers/projectDetails.js'
import userRouters from './routers/users.js'
import routeRouters from './routers/routes.js';

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.use('/posts', postsRouters)

app.use('/products', productRouters)

app.use('/portfolios', portfolioRouters)

app.use('/projects', projectRouters)

app.use('/projectDetails', projectDetailRouters)

app.use('/user', userRouters)

app.use('/route', routeRouters)

app.get('/', (req, res) => {
    res.send('Welcom to MERN fullstack API')
})

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB')
        app.listen(PORT, () => {
            console.log(`server on running port ${PORT}`)
        })

    }).catch((err) => {
        console.error('err', err)
    })