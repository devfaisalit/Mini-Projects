const express = require("express")
const app = express()
const port = 4000
const say = require("say")
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "hbs")
app.set("views", __dirname + "/views")

// Initialize textToSpeak as an empty string at the beginning
let textToSpeak = "";
let voice = ''
let vspeed = ''
app.get("/", (req, res) => {
    res.render("header", { textToSpeak,voice }); // Pass textToSpeak to the template
})

app.get("/export", (req, res) => {
    res.render("export", { textToSpeak,voice }); // Pass textToSpeak to the template
})


app.post("/", (req, res) => {
    textToSpeak = req.body.text;
    voice = req.body.selectvoice
    vspeed = req.body.vspeed
    say.speak(textToSpeak,voice,vspeed, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Text spoken successfully!");
    });
});

app.post('/export', (req, res) => {
    say.export(textToSpeak,voice,vspeed, 'hal.mp3', (err) => {
        if (err) {
            return console.error(err)
        }
    })
    res.redirect("/")
});

app.listen(port, () => {
    console.log(`Your app is running on http://localhost:${port}`)
})
