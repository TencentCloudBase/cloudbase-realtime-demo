exports.main = function() {
    return {
        isBase64: false,
        statusCode: 200,
        headers: { 'Content-Type': 'text' },
        body: 'Hello TWeb!'
    }
}