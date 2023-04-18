const enum JsonFormatStatus {
    SUCCESS = 1,
    ERROR = 2,
    FAIL = 3
}

interface JsonFormat {
    status: JsonFormatStatus;
    message: string;
    data: object;
}

function getResponse(status: JsonFormatStatus, message: string, data: object): JsonFormat {
    const response: JsonFormat = {
        status: status,
        message: message,
        data: data
    }

    return response;
}


//==================================================================================================
// Exports
//==================================================================================================
export { JsonFormatStatus, JsonFormat, getResponse };
