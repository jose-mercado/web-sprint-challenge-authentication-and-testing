const Users = require("../users/users-model")
const bcrypt = require("bcryptjs")

const checkDuplicates = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await Users.findByUserName(username)
        if (user) {
            return res.status(400).json({
                message: "Username is already taken. Please use another username.",
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const checkPayload = (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).json(
                "username and password required"
            )
        } else {
            next()
        }
}

// const checkUsernameExists = async ( req, res, next) => {
//     try{
//         const rows = await Users.findByUserName({username: req.body.usernme})
//         if(rows.length.trim()){
//             req.userData = rows[0]
//             next()
//         }else{
//             res.status(401).json({
//                 "message": "Invalid credentials"
//             })
//         }
//         }catch(e){
//             res.status(500).json({message:'error'})
//         }
// }

const checkUsernameExists = async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await Users.findByUserName(username)
        if (!user) {
            return res.status(401).send({
                message: "invalid credentials",
            })
        }
        const passwordValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValid) {
            return res.status(401).json({
                message: "invalid credentials",
            })
        }
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkDuplicates,
    checkPayload,
    checkUsernameExists,
}