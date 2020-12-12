class CustomError extends Error {
    constructor(message, status) {
        super(message, status);
        this.staus = status;
    }
}
module.exports = CustomError;