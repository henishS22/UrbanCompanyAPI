class appError extends Error{
    constructor(res,message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail':'error';

        res.status(this.statusCode).json({
            status: this.status,
            message: this.message
        })
    }
}
module.exports = appError;