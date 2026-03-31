const express = require('express');
const router = express.Router();
const {fetchParameterByIndexByCar, fetchMultipleParametersByCar} = require('../models'); 
const {validateCarId} = require('../helpers');

router.get('/parameter-edit', async (req, res) => {
  try {
    const { carId, bits, index } = req.query;
    
    const carNum = validateCarId(carId);

    const targetValueColumn = `value${carNum}`;
    const targetChangedColumn = `is_changed_car${carNum}`;
    const parameter = await fetchParameterByIndexByCar(carNum, index, bits);


    if (!parameter) {
      return res.status(404).json({ error: 'Parameter not found' });
    }

    const responseData = {
      id: parameter.id,
      name: parameter.name,
      index: parameter.index,
      type: parameter.type,
      sw_name: parameter.sw_name,
      carId: parseInt(carId),
      value: parameter[targetValueColumn], 
      is_changed: parameter[targetChangedColumn]
    };

    res.json(responseData);

  } catch (error) {
    console.error('Error fetching parameter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/parameter-batch', async (req, res) => {
  try {
    const { carId, paramsList } = req.body;
    
    if (!paramsList || !Array.isArray(paramsList)) {
        return res.status(400).json({ error: 'paramsList must be an array' });
    }

    const carNum = validateCarId(carId);
    if (!carNum) {
        return res.status(400).json({ error: 'Invalid carId' });
    }

    const targetValueColumn = `value${carNum}`;
    const targetChangedColumn = `is_changed_car${carNum}`;

    const parameters = await fetchMultipleParametersByCar(carNum, paramsList);

    const responseData = parameters.map(p => ({
      id: p.id,
      name: p.name,
      index: p.index,
      type: p.type,
      sw_name: p.sw_name,
      carId: parseInt(carId),
      value: p[targetValueColumn], 
      is_changed: p[targetChangedColumn]
    }));

    res.json(responseData);

  } catch (error) {
    console.error('Error fetching multiple parameters:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;