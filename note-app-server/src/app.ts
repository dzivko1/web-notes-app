import { Application, Request, Response, Router } from "express"

const express = require('express')
const app: Application = express()
const api: Router = express.Router()

api.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use("/api", api)

export = app