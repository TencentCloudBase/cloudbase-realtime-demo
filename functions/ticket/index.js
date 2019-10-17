const tcb = require('tcb-admin-node')

tcb.init({
    env: '',
    secretId: '',
    secretKey: '',
    credentials: require('./tcb_custom_login.json')
})

exports.main = function () {
    const randomNumber = Math.floor(Math.random() * 1e5)
    const uid = 'tmp' + randomNumber
    return {
        isBase64: false,
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            ticket: tcb.auth().createTicket(uid),
            uid
        })
    }
}
