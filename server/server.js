const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { port, mongoURI } = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB database is connected"))
	.catch((err) => console.log(err));

app.use("/", (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Express is running on port ${port}`));
