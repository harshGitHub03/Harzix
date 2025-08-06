const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // 🔥 Required
}));

app.use(cookieParser()); // ✅ Parse cookies into req.cookies


require("./mySqlDB/mysql.connect")


const PORT = process.env.PORT || 3000
app.use(express.json());


//routes
const authRoute = require("./routes/auth.routes")
const chatRoute = require("./routes/mistral.chat.route")
const chatHistory = require("./routes/chat.history.fetch")
app.use("/auth", authRoute)
app.use("/chat", chatRoute)
app.use("/chat-history", chatHistory)


app.listen(PORT, () => console.log("Server running..."))