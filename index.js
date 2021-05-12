const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(bodyParser.json())
app.use(cors())

const { initializeDBConnection } = require("./db/db.connect")

const PORT = process.env.PORT || 8000

initializeDBConnection()

const userRouter  = require("./routes/user.route")
const playlistRouter = require("./routes/playlist.route")
const { errorHandler } = require("./middlewares/errorHandler.middleware")
const { routeNotFound } = require("./middlewares/routeNotFound.middleware")

app.use("/api/user", userRouter)
app.use("/api/playlist", playlistRouter)

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.use(errorHandler)
app.use(routeNotFound)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})