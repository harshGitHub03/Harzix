const db = require("../mySqlDB/mysql.connect");
const { generateToken } = require("../utils/jwt");
const { hashPassword } = require(".././utils/bcrypt.hash")
const bcrypt = require("bcrypt")

exports.registerController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        console.log(req.body)
        //check if user exists
        const [isExists] = await db.execute("select * from users where email=?", [email])
        if (isExists.length > 0) {
            return res.status(401).json({
                message: "User already exists!"
            })
        }

        //hash password
        const hashedPassword = await hashPassword(req.body.password)
        const body = { ...req.body, password: hashedPassword };

        const keys = Object.keys(body).map((key) => `${key}`).join(",")
        const placeholders = Object.keys(body).map(() => `?`).join(",")
        const values = Object.values(body).map((value) => value)


        //register user
        const response = await db.execute(`insert into users(${keys}) values (${placeholders})`, values)

        //fetch user 
        const [user] = await db.execute("select id,name,email,phone from users where email=?", [email])


        // generate token
        const token = await generateToken({
            id: response[0].insertId,
            email: user[0].email
        })

        return res.status(200).json({
            message: "User registered successfully!",
            user: user[0],
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error!",
            error: error.message
        })
    }
}


// login controller
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const [isExists] = await db.execute("select * from users where email = ?", [email])
        if (isExists.length == 0) {
            return res.status(401).json({
                message: "User dosen't exists!"
            })
        }

        //match credientials
        const isPasswordMatch = await bcrypt.compare(password, isExists[0].password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credientials!"
            })
        }

        // generate token
        const token = await generateToken({
            id: isExists[0].id,
            email: isExists[0].email
        })

        const { password: _password, ...filteredUser } = isExists[0]

        //return as password matched
        return res.status(200).json({
            message: "User Logged in successfully!",
            user: filteredUser,
            token //jwt passed as we cannot use samesite lax and  post at same time in localhost
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error!",
            error: error.message
        })
    }
}



//getUserDetails
exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId)
        const [rows] = await db.execute(
            "SELECT id, name, email, phone FROM users WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User details fetched successfully!",
            user: rows[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error!",
            error: error.message,
        });
    }
};