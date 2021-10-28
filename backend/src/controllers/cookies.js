const getTokenFromCookie = async (req, cookieName) => {
    const token = req.cookies[cookieName];
    if (!token) throw new Error("No token, authorisation deneid");
    return token;
};

const clearCookie = (res, cookieName) => {
    res.clearCookie(cookieName);
};

const setCookie = (res, cookieName, cookie) => {
    res.cookie(cookieName, cookie, {
        httpOnly: true,
    });
};

module.exports = {
    clearCookie,
    getTokenFromCookie,
    setCookie,
};
