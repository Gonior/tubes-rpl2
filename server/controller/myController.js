const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports = {
    getDate : () => {
        let result;
        let date = new Date()
        result = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        return result
    },
    authenticateToken : (req, res, next) => {
        let authHeader = req.headers['authorization']
        let token = authHeader && authHeader.split(' ')[1]
        if (token === null) return res.sendStatus(401)
        else {
            jwt.verify(token, secret, (err, decode) => {
                if (err) return res.sendStatus(401)
                else {
                    if (!decode.isAdmin) {
                        req.body.user = decode
                        next()
                    } else return res.sendStatus(401)
                }
            })
        }
    }, 
    authenticateAdminToken : (req, res, next) => {
        let authHeader = req.headers['authorization']
        let token = authHeader && authHeader.split(' ')[1]
        if (token === null) return res.sendStatus(401)
        else {
            jwt.verify(token, secret, (err, decode) => {
                if (err) return res.sendStatus(401)
                else {
                    if (decode.isAdmin) {
                        req.body.user = decode
                        next()
                    } else return res.sendStatus(401)
                }
            })
        }
    }, 
} 

