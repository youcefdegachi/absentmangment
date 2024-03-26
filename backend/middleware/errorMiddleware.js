
// if front send request not found
const notFound = (req, res, next) => {
  // Create a  Error object with a message indicating the requested URL was not found
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  

  const errorHandler = (err, req, res, next) => {

    // if error is 200 change it to 500 else return statusCode
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    //save the error in message variable to show it later 
    let message = err.message;
    

    res.status(statusCode).json({
      message: message,
      //change the status of NODE_ENV form devloper to production
      //! cant change code 
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };
  