const path = require('path');
const { ERROR_CODES_MODULE } = require(path.join(__dirname, 'module_constants.js'));

function convert_errors_codes(result)
{
    const e_d = ERROR_CODES_MODULE[result.errorCode];
    return {
        isValid: false,
        error: { 
            code: e_d.code,
            message: result.message
          } 
          
      };
}


module.exports = {  convert_errors_codes };