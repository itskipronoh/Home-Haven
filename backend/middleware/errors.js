// // Error handling middleware
// app.use((err, req, res, next) => {
//     // Check if the error has a status code, default to 500 if not set
//     const status = err.status || 500;
//     // Send the error response
//     res.status(status).json({
//       error: {
//         message: err.message,
//         status: status
//       }
//     });
//   });
  