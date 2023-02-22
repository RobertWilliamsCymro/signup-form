export const lambdaHandler = async function () {
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/html"},
        body: '<a href="http://www.google.com">Click Me</a>'
    }
};