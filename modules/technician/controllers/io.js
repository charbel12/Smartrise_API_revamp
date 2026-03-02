const express = require('express');
const router = express.Router();
const { getBoardIO } = require('../models/ioModel');
const {validateCarId} = require('../helpers/index')


router.get('/mr', async (req, res) => {
    try {
        const carNum = validateCarId(req.query.car_number);
        const data = await getBoardIO('MR', 8, carNum, { input: 0, output: 392 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/cartop', async (req, res) => {
    try {
        const carNum = validateCarId(req.query.car_number);
        const data = await getBoardIO('CT', 16, carNum, { input: 8, output: 400 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/risers', async (req, res) => {
    try {
        const carNum = validateCarId(req.query.car_number);
        const riserNum = parseInt(req.query.riser_number) || 1;
        
        // Offset Logic: Risers 1-4
        const inputStart = 40 + (riserNum - 1) * 8;
        const outputStart = 432 + (riserNum - 1) * 8;

        const data = await getBoardIO(`RIS${riserNum}`, 8, carNum, { 
            input: inputStart, 
            output: outputStart 
        });
        res.json({ ...data, riser_number: riserNum });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/expansion', async (req, res) => {
    try {
        const carNum = validateCarId(req.query.car_number);
        const expNum = parseInt(req.query.expansion_number) || 1;
        const label = expNum < 10 ? `EXP0${expNum}` : `EXP${expNum}`;

        const inputStart = 72 + (expNum - 1) * 8;
        const outputStart = 464 + (expNum - 1) * 8;

        const data = await getBoardIO(label, 8, carNum, { 
            input: inputStart, 
            output: outputStart 
        });
        res.json({ ...data, expansion_number: expNum });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/cop', async (req, res) => {
    try {
        const carNum = validateCarId(req.query.car_number);

        const data = await getBoardIO('COP', 16, carNum, { 
            input: 24, 
            output: 416 
        }, true); 

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;