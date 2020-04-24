const jsonResult = {
    codes: {
        OK: 0,
        AUTH_FAILED: -1,
        LOGIN_FAILED: -2,
        PARAM_INVALID: -3,
        LOGIC_ERROR: -4
    },
    success: function (msg, data) {
        msg = msg || 'OK';
        data = data || null;
        return {
            code: jsonResult.codes.OK,
            msg: msg,
            data: data
        }
    },
    authFail: function (msg) {
        msg = msg || 'Authentication failed';
        return {
            code: jsonResult.codes.AUTH_FAILED,
            msg: msg
        }
    }
}

module.exports = jsonResult;