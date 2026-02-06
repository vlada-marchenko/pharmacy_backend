export function errorHandler(err, req, res, next) {
    const status = err.status || 500

    if (res.headersSent) return next(err)
        
    res.status(status).json({
        message: err.message || 'Internal Server Error'
    })
}