const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { port, mongoURI } = require("./config/config");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use(morgan("dev"));


mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify : true
	})
	.then(() => console.log("MongoDB database is connected"))
	.catch((err) => console.log(err));

app.get("/", (req, res) => res.json({message : "Hello world!"}));
app.use("/login", require('./routes/auth'))
app.use("/pk", require('./routes/puskesmas'))
app.use("/q", require('./routes/queue'))
app.listen(port, () => console.log(`Express is running on port ${port}`));
