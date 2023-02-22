export const lambdaHandler = async function () {
    return {
        statusCode: 200,
        headers: {"Content-Type": "text/html"},
        body: '<p>Thanks for signing up! You will receive an email shortly.</p>'
    }
};