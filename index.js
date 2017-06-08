'use strict';
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
}, };
}
// --------------- Events -----------------------
function dispatch(intentRequest, callback) {
    console.log('request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.intentName}');
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    
    if (slots.letter === undefined || slots.letter.length === 0) {
        callback(close(sessionAttributes, 'Fulfilled', {'contentType': 'PlainText', 'content': `Naaah, you didn't provide a letter (${slots.letter}) !`}));
    }   
    else {
        const letter = slots.letter.toLowerCase().substr(0, 1);
        callback(close(sessionAttributes, 'Fulfilled', {'contentType': 'PlainText', 'content': `Okay, You asked the letter ${letter} (${slots.letter})!`}));
    }
}
// --------------- Main handler -----------------------
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
