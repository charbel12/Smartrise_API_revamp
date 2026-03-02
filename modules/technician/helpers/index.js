const validateCarId = (carId) => {
    if (carId === undefined) {
        return res.status(400).json({ error: 'Missing required query parameters: carId, index' });
    }

    const carNum = parseInt(carId) + 1;

    if (carNum < 1 || carNum > 8) {
        return res.status(400).json({ error: 'Invalid carId. Must be between 0 and 7.' });
    }

    return carNum;
}

module.exports = {
    validateCarId
}