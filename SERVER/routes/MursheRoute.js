const express = require('express');
const router = express.Router();

const controller = require('../controllers-bl/mursheController')

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get('/:mursheDetalisId', async (req, res) => {
    try {
        const foundMursheDetalis= await controller.get(req.params.mursheDetalisId);
        if (foundMursheDetalis) {
            res.json(foundMursheDetalis);
        }
        else res.status(404).send(`murshe with id ${req.params.mursheDetalisId} not found`);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error.message == 'invalid new murshe id') {
            res.status(400).send(`murshe with id ${req.body.id} invalid`)
        }
        else next(error);
    }
});

router.put('/:mursheDetalisId', async (req, res, next) => {
    try {
        let result = await controller.update(req.params.mursheDetalisId, req.body);
        res.status(200).send(result);

    } catch (error) {
        if (error.message.startsWith('could not update murshe id')) {
            res.status(404).send(`could not update murshe id ${req.params.mursheDetalisId}, murshe not found`);
        }
        else next(error);
    }
});

router.delete('/:mursheDetalisId', async (req, res, next) => {
    try {
        let result = await controller.delete(req.params.mursheDetalisId);
        if (result) {
            res.send('murshe deleted successfully')
        }
        else {
            res.status(400).send(`invalid murshe id ${req.params.mursheDetalisId}`)
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;