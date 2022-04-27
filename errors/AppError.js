
/**
 * @class AppError
 * Error thrown when something wrong happens during download process
 */
class AppError extends Error{

    constructor(message, status = 500) {
        super(message);
        this.status = 500;
    }
}

module.exports = AppError;