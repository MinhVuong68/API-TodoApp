const jwt  =require('jsonwebtoken')

const middlewareController = {
    //verifyToken
    verifyToken: (req,res,next) => {
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=> {
                if(err) {
                    res.status(400).json("token is not valid")
                }
                req.body.user = user;
                next();
            })
        }
        else {
            res.status(401).json("You're not authenticated")
        }
    }
}

module.exports = middlewareController