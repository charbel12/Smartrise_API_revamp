const express = require('express');
const router = express.Router();
const {fetchParameterByIndexByCar} = require('../models'); 
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

module.exports = router;