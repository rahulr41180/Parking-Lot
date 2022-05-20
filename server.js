
const app = require("./src/index");

const Connectdb = require("./src/config/db");

app.listen(5000, async () => {
    try {

        await Connectdb();

        console.log("listening on port 5000");
    }
    catch(error) {
        console.log('error:', error);
    }
})