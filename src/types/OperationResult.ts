type OperationResult<T> = {
    success: boolean;
    message?: string; // Optional message for additional information
    data?: T;        // Optional variable for defining input data
};

export default OperationResult;