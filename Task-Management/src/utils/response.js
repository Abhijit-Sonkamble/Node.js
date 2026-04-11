module.exports.successRes = (status, error = false, message, result) => {
    return {status, error, message, result}
}


module.exports.errorRes = (status, error = true, message) => {
    return {status, error , message}
}