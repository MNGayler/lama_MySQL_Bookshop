import e from "express";
import express from "express";
import mysql from "mysql";
import cors from "cors"

const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "book_webapp",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from the server");
});

// get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// add book
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book has been added");
  });
});

app.listen(3000, () => {
  console.log("connected to port 3000!");
});
