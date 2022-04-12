const jwt = require('jsonwebtoken')


const auth = (req, res, next)=>{
    try {
        const token = req.header("x-auth-token")
        // console.log(token)
        if(!token){
            return res.status(401).json({
                msg:"no token"
            })
        }
        const verify = jwt.verify(token,"yyuyuywedhssss77&^&^&YDSYYD&*T#^T^TDGDG#&Y&*Y&*RY#FH&*H&*HG&F*T^RGR#RG^R^G&R#&G")
        // console.log("vv",verify)
        if(!verify){
            return res.status(400).json({
                msg:"verification failed" 
            })
        }
        // console.log(verify)
        req.user = verify.id;
        next()

    } catch (error) {
        return res.status(400).json({
            msg:error
        })
    }
}

module.exports = auth