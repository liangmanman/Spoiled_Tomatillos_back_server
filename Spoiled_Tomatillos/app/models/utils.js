
function incrementVersionNumberForQuery(next) {
    this.update({}, { $inc: { __v: 1 } });
    return next();
}

function incrementVersionNumberForSchema(next) {
    this.increment();
    return next();
}

module.exports = {
    incrementVersionNumberForQuery,
    incrementVersionNumberForSchema,
};