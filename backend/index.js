require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { globalRateLimiter } = require("./src/middlewares/rateLimit");
const errorHandler = require("./src/middlewares/errorHandler");
const logger = require("./src/config/logger");




const app = express();



const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(globalRateLimiter)
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});