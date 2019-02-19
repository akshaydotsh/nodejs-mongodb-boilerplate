const {sendMail} = require('../utils/sendgrid');

module.exports.success200 = (resp, data) => {
    if (data) {
        data.success = true;
    } else {
        data = {
            message: 'no data',
            success: true
        }
    }
    return resp.status(200).json(data);
};

module.exports.success201 = (resp, data) => {
    if (data) {
        data.success = true;
    } else {
        data = {
            message: 'no data',
            success: true
        }
    }
    return resp.status(201).json(data);
};

function generateErrorResponse(data) {
    let errorResponse = {}
    errorResponse.success = false;
    if (data.hasOwnProperty('errors')) {
        errorResponse.errors = data.errors
    }
    if (data.hasOwnProperty('message')) {
        errorResponse.message = data.message
    }
    if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
        if (data.hasOwnProperty('internalData')) {
            errorResponse.internalData = data.internalData
        }
    } else if (data.statusCode === 500) {
        sendMail('We got exception on database', new Error(data.internalData).toString(), function (error, result) {
            if (error) {
                console.error(error.toString());
                //Extract error msg
                const {message, code, response} = error;
                //Extract response msg
                const {headers, body} = response;
                console.log("Error body", body);
            } else {
                // done sending ....
                console.log("Database exception send to mail");
            }
        })
    }
    return errorResponse
}

module.exports.error = (resp, data) => {
    data.success = false;
    let statusCode = data.statusCode || 400;
    return resp.status(statusCode).json(generateErrorResponse(data));
};
