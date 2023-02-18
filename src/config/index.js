if (process.env.NODE_ENV !== "production") {
    if (process.env.NODE_ENV === "test") {
        require("dotenv").config({ path: 'test.env' });
    }
    else {
        require("dotenv").config();
    }
}

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT,
    MONGO_URI: process.env.MONGO_URI,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET
}