const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// use whatever is in .env file
require("dotenv").config();

// initiate express app
const app = express();
const port = process.env.PORT || 8300;

// use middleware cors and convert express communication to json
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use mongo connected uri
const uri = process.env.URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const booksRouter = require("../app/routes/books.routes");

app.use("/books", booksRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
