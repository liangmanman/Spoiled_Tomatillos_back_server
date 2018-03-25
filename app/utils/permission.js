"use strict";


function validateUserHasPermission({ userInfo, userId}) {
    return userInfo.userId === userId;
}

function sendPermissionError({ userId, res}) {
    return res.status(403).send(`You don't have the permission to modify the data of user: ${userId}`);
}

module.exports = {
    validateUserHasPermission,
    sendPermissionError,
};