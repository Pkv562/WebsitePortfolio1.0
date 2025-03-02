const express = require("express");
const path = require("path");

const app = express();
const PORT = 5500;

app.use(express.static(path.join(__dirname)));

app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/home/index.html"));
});

app.get("/calculator", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/calculator/main.html"));
});

app.get("/note", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/note/note.html"));
});

app.get("/resume", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/resume/portfolio.html"));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "pages/error/404.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
