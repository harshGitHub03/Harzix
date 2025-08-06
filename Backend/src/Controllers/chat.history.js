const db = require("../mySqlDB/mysql.connect");


// get chat history
exports.getChatHistory = async (req, res) => {
    try {
        const user_id = req.user.id

        //fetch history
        const [history] = await db.execute(`select role,content from chatHistory where user_id=?`, [user_id])

        if (history.length == 0)
            return res.status(400).json({ message: "No chat history yet!" })

        return res.status(200).json({ message: "Chat history fetched successfully!", history });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};