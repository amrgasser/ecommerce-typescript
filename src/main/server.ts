import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './Controllers/UserController'
import productRoutes from './Controllers/ProductController'
import orderRoutes from './Controllers/OrderController'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
