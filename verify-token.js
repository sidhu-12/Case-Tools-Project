const jwt = require('jsonwebtoken')


module.exports = function(req,res,next) {
    let authToken = ''
    let email = ''
    if(req.headers.cookie && req.headers.cookie.includes('authTokenUser')){
        authToken = req.cookies.authTokenUser
     email = encodeURI(req.cookies.email)
    }
    jwt.verify(authToken,  "QGa87@j4Idy3" , (err, decodedToken) => {
        if(!decodedToken)
        {
            res.redirect('/login/acceptor')
    
        }
        else if(decodedToken._username===email && decodedToken.access === req.cookies.type){
            req.email = decodedToken.email
            next()
        }
        else {
            return res.status(401).send('Authentication failed')
        }
})

}