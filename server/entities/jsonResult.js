'use strict';

const jsonResult = {
    codes: {
        OK: 200,
        BAD_REQUEST: 400,
        AUTH_FAILED: 401,
        NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    success: function (msg, data) {
        return {
            code: jsonResult.codes.OK,
            msg,
            data
        };
    },
    badRequest: function (msg) {
        return {
            code: jsonResult.codes.BAD_REQUEST,
            msg
        };
    },
    authFail: function (msg) {
        return {
            code: jsonResult.codes.AUTH_FAILED,
            msg
        };
    },
    notFound: function (msg) {
        return {
            code: jsonResult.codes.NOT_FOUND,
            msg
        };
    },
    serverError: function (msg) {
        return {
            code: jsonResult.codes.SERVER_ERROR,
            msg
        };
    }
};

module.exports = jsonResult;
