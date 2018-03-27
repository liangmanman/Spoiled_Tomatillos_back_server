
function sendJoiValidationError(error, res) {
    return res.status(400).send(error.details);
}

module.exports = {
    sendJoiValidationError,
};