const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    try {
        
        let token = req.header("x-token");

        if(!token){
            return res.status(401).send("Access Denied");
        }

        let decoded = jwt.verify(token,"randomString");
        req.user = decoded.user;

        next();

    } catch (err) {
        console.log(err);
        return res.status(500).send("Authentication Error");
    }
    
}