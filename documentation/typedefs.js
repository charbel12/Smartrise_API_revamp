
/**
 * @typedef ELEVATORFAULTGROUP
 * @property {string} Elevator Faults - For elevator faults
 */


/**
 * @typedef ResponseCode
 * @property {[integer]} code.required - response code 
 */


/**
* @typedef DatatableResponse
* @property {string} userId - userId
* @property {string} username.required - username
* @property {string} image - image
* @property {string} name - name.
* @property {string} token - token.
*/

/**
* @typedef DatatableSearchPayload
* @property {string} value - search value, default: empty
* @property {boolean} regex - search parameter
*/

/**
* @typedef DatatablePayload
* @property {integer} start - starting item per page
* @property {integer} length - number of items per page
* @property {DatatableSearchPayload.model} search.required - Search Parameter
*/

/**
* @typedef NewUser
* @property {UserCredentials.model} credentials.required - user credentials
* @property {UserDetails.model} details.required - user info details
*/

/**
* @typedef UserDetails
* @property {string} first_name.required - first name
* @property {string} last_name.required - last name
* @property {string} middle_name - middle name
* @property {string} contact_number.required - contact number
* @property {string} email - email.required
* @property {string} image - image
*/

/**
* @typedef UserCredentials
* @property {string} username.required - Username
* @property {string} password.required - Password
*/


/**
* @typedef Payload
* @property {string} username.required - username
* @property {string} password.required - user's password.
*/

/**
* @typedef AuthResponseSuccess
* @property {string} userId.required - userId
* @property {string} username - username.
* @property {string} image - image
* @property {string} name - name.
* @property {string} token.required - token.
*/

/**
* @typedef AuthResponseFailed
* @property {boolean} successful.required - indicates the failed attempt
* @property {string} message.required - err/response message.
*/


/**
* @typedef DefaultResponse
* @property {boolean} successful.required - indicates the failed attempt
* @property {string} message.required - err/response message.
*/


/**
* @typedef Controls
* @property {string} name.required - Name
* @property {string} value.required - Value
* @property {integer} car_id.required - Car ID
* @property {integer} group_id.required - Group ID
*/