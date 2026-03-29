const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const multer = require("multer")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((err, _req, res, _next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "Resume file is too large. Please upload a PDF up to 5MB."
            })
        }

        return res.status(400).json({
            message: err.message || "Invalid file upload."
        })
    }

    if (err) {
        return res.status(400).json({
            message: err.message || "Request failed."
        })
    }
})



module.exports = app
