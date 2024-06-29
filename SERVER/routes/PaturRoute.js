const express = require('express');
const router = express.Router();
const controller = require('../controllers-bl/PaturController');

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/:paturDetalisId', async (req, res, next) => {
    try {
        const foundPaturDetalis = await controller.get(req.params.paturDetalisId);
        if (foundPaturDetalis) {
            res.json(foundPaturDetalis);
        } else {
            res.status(404).send(`patur with id ${req.params.paturDetalisId} not found`);
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error.message == 'invalid new patur id') {
            res.status(400).send(`patur with id ${req.body.id} invalid`);
        } else {
            next(error);
        }
    }
});

router.put('/:paturDetalisId', async (req, res, next) => {
    try {
        let result = await controller.update(req.params.paturDetalisId, req.body);
        res.status(200).send(result);
    } catch (error) {
        if (error.message.startsWith('could not update patur id')) {
            res.status(404).send(`could not update patur id ${req.params.paturDetalisId}, patur not found`);
        } else {
            next(error);
        }
    }
});

router.delete('/:paturDetalisId', async (req, res, next) => {
    try {
        let result = await controller.delete(req.params.paturDetalisId);
        if (result) {
            res.send('patur deleted successfully');
        } else {
            res.status(400).send(`invalid patur id ${req.params.paturDetalisId}`);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
