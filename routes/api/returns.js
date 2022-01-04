// POST /api/returns {customerId, movie}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if not rental is found for the customer and movie
// Return 400 if the return has already been processed.
// Return 200 if the valid request
// Send the return data and the rental fee
// Increase the stock of the particular movie
 