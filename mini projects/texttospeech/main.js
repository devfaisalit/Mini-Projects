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

app.get("/", (req, res) => {
    res.render("header", { textToSpeak }); // Pass textToSpeak to the template
})

app.get("/export", (req, res) => {
    res.render("export", { textToSpeak }); // Pass textToSpeak to the template
})

let voices = [
    { voice: 'Alex', text: 'Most people recognize me by my voice.' },
    { voice: 'Amelie', text: 'Bonjour, je m’appelle Amelie. Je suis une voix canadienne.' },
    { voice: 'Kyoko', text: 'こんにちは、私の名前はKyokoです。日本語の音声をお届けします。' },
    { voice: 'Samantha', text: 'Hello, my name is Samantha. I am an American-English voice.' },
    { voice: 'Yuna', text: '안녕하세요. 제 이름은 Yuna입니다. 저는 한국어 음성입니다.' }
  ]

app.post("/", (req, res) => {
    textToSpeak = req.body.text; 
    say.speak(textToSpeak,'Ralph', 0.8, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Text spoken successfully!");
    });
});

app.post('/export', (req, res) => {
    say.export(textToSpeak,'Ralph',0.8, 'hal.mp3', (err) => {
        if (err) {
            return console.error(err)
        }
    })
    res.redirect("/")
});

app.listen(port, () => {
    console.log(`Your app is running on http://localhost:${port}`)
})
