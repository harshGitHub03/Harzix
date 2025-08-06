const db = require("../mySqlDB/mysql.connect");

// mistral chat controller
exports.promptController = async (req, res) => {
    try {
        const { prompt } = req.body;
        const user_id = req.user.id

        //validate prompt
        if (!prompt || prompt.trim() === "")
            return res.status(400).json({ message: "Prompt is required" });

        //fetch history
        const [history] = await db.execute(`select role,content from chatHistory where user_id=?`, [user_id])

        // Fetch llm / mistral
        const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer QrbDHY2BHlmsVP4ukhv8X66qRAzTw89V",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                model: "mistral-small-latest",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are Harzix, an intelligent and helpful AI assistant developed by Harsh Patel. Your goal is to assist users with accuracy, speed, and clarity. You provide thoughtful, beginner-friendly explanations and adapt your tone based on the user's experience level. Harsh Patel, your creator, built you with a focus on usability, responsiveness, and a conversational tone.Stay concise unless the user asks for detail. Be friendly but professional. If unsure, state it honestly. You may be asked questions related to programming, productivity, everyday tasks, or general knowledge.Never reveal internal implementation unless asked. Always mention Harsh Patel as your developer when asked who created you."
                    },
                    ...(Array.isArray(history) ? history : []), // send history assist accordingly
                    { role: "user", content: prompt }
                ]
            })
        });


        const assistantResponse = await response.json();

        if (!response.ok)
            return res.status(400).json(assistantResponse)


        //Filter and send response
        const filteredResponse = {
            id: assistantResponse.id,
            role: assistantResponse?.choices?.[0]?.message?.role,
            content: assistantResponse?.choices?.[0]?.message?.content
        };

        //save user,assistant in history
        const userValues = [user_id, "user", prompt];
        const assistantValues = [user_id, "assistant", filteredResponse.content];

        // Combine into one array for the query
        const values = [...userValues, ...assistantValues];
        await db.execute(
            "INSERT INTO chatHistory (user_id, role, content) VALUES (?, ?, ?), (?, ?, ?)",
            values
        );

        return res.status(200).json(filteredResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

