const mongoose = require("mongoose")
const config = require("../config.json")

module.exports = async () => {
    await mongoose.connect(`${config.mongoUrl}`)
        .then(() => {
            console.log("MongoDB Bağlantısı Başarılı")
        }).catch((e) => e)
}