const Users = require('../users/users-model')

const checkPayload = (req, res, next) => {
    if(!req.body.username || !req.body.password ){
        res.status(401).json({message: "username and password required"})
    }
    else{
        next()
    }
}

const checkUserInDB =  async (req,res,next) => {
    try{
        const row = await Users.findBy({username: req.body.username})
        if(!row.length){
            next()
        }
        else {
            res.status(401).json("username taken")
    } 
    } catch(e) {
        res.status(500).json(`server error: ${e.message}`)
    }
}

const checkUsernameExists = async ( req, res, next) => {
    try{
        const rows = await Users.findByUserName({username: req.body.usernme})
        if(rows.length.trim()){
            req.userData = rows[0]
            next()
        }else{
            res.status(401).json({
                "message": "Invalid credentials"
            })
        }
        }catch(e){
            res.status(500).json({message:'Server broke'})
        }
}

module.exports = {
    checkUsernameExists,
    checkPayload,
    checkUserInDB

}