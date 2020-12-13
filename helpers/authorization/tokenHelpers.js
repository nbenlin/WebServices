const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
}

const getAccesTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(' ')[1];
    return accessToken;
}

module.exports = {
    isTokenIncluded,
    getAccesTokenFromHeader
}