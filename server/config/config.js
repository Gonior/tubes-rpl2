module.exports = {
	port: process.env.PORT || 3000,
	mongoURI: process.env.MONGO_URI || "mongodb+srv://arthemuss14:rNKQ7Lqe3aBLe8pF@goniorcluster.yixee.mongodb.net/TubesDB?retryWrites=true&w=majority",
	secret : process.env.MY_SECRET || 'rahasia'
};
