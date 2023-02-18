import express from "express";

const requestLoggerMiddeware = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.log(`${req.method} ${req.originalUrl}`);

    const start = new Date().getTime();

    res.on('finish', () => {
        
        const elapsed = new Date().getTime() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);

    })
    next();
};

export { requestLoggerMiddeware };