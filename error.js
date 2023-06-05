class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

//   const error = new CustomError('Not found', 404);
// console.log("CustomError: "+error.message); 
// console.log("CustomError: "+error.statusCode); 


module.exports = CustomError;
