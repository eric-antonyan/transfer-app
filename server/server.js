const express = require("express");
const Users = require("./models/users.js");
const cors = require("cors");
const { default: mongoose } = require("mongoose")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const users = require("./models/users.js");
const helmet = require("helmet")
const checkRouter = require("./routes/check.router.js")
require("dotenv").config()

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);

app.use(helmet())

const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365);

app.use(express.json());

app.post("/user", async (req, res) => {
    const { email, password, passcode, firstName, lastName, phone } = req.body;
    const uuid = crypto.randomUUID()
    const isExist = await users.findOne({ email });
    if (req.headers.authorization === process.env.SERVER_PASSCODE) {
        if (isExist) {
            res.json({ success: false, message: "This email (" + email + ") is exist" })
        } else {
            const token = jwt.sign(uuid, uuid)
            const newUser = await Users.create({
                uuid,
                email,
                password,
                passcode,
                firstName,
                lastName,
                phoneNumber: phone,
            });
            res.send({ user: newUser, success: 1, message: "User added successfully", data: { token } });
        }
    } else {
        res.json({ message: "incorrect Auth code" })
    }
});

app.post('/auth', async (req, res) => {
    const { email, password } = req.body
    const isExist = await users.findOne({ email, password })
    if (isExist) {
        const token = jwt.sign(isExist.uuid, isExist.uuid)
        res.send({message: "You successfully logged in", success: true, auth: {token}})
        console.log(isExist);
    } else {
        res.send({message: "This account not found", success: false})
    }
})

app.use('/check', checkRouter)

app.post("/send-code", async (req, res) => {
    const { email, verifyCode } = req.body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "antonyancoding@gmail.com",
            pass: "xhrqpbilfmjtszir"
        }
    })

    const info = await transporter.sendMail({
        from: '"Swift Bank" <antonyancoding@gmail.com>',
        to: email,
        subject: "Verification Code ✔",
        html: `<center><h1>Welcome to Swift Bank!</h1></center>
        <br>
        <center><h3 style="line-height:27px">
        Your <span style="color:#fff;background:#ffb700;padding:3px 10px;font-size:14px;border-radius:4px">Swift Bank</span> verification code is ${verifyCode}</h3>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.send({ messageId: info.messageId, success: info.messageId ? true : false, message: "Code" })
})

const startServer = async () => {
    mongoose.connect("mongodb+srv://antonyaneric:9ALlNOWibruXfD2y@cluster0.hfvu6sp.mongodb.net/transfer-app")
    app.listen(3001, () => {
        console.log("Express server initialized");
    });
}

startServer()