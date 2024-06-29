const express = require('express');
const router = express.Router();

const controller = require('../controllers-bl/CustomersController')

router.get('/', async (req, res, next) => {
    try {
        const result = await controller.getAll(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get('/:customerId', async (req, res) => {
    try {
        const foundCustomers = await controller.get(req.params.customerId);
        if (foundCustomers) {
            res.json(foundCustomers);
        }
        else res.status(404).send(`custemer with id ${req.params.customerId} not found`);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        let result = await controller.insert(req.body);
        res.status(201).send(result);
    } catch (error) {
        if (error.message == 'invalid new custemer id') {
            res.status(400).send(`custemer with id ${req.body.id} invalid`)
        }
        else next(error);
    }
});

router.put('/:custemerId', async (req, res, next) => {
    try {
        let result = await controller.update(req.params.custemerId, req.body);
        res.status(200).send(result);

    } catch (error) {
        if (error.message.startsWith('could not update custemer id')) {
            res.status(404).send(`could not update custemer id ${req.params.custemerId}, custemer not found`);
        }
        else next(error);
    }
});

router.delete('/:custemerId', async (req, res, next) => {
    try {
        let result = await controller.delete(req.params.custemerId);
        if (result) {
            res.send('custemer deleted successfully')
        }
        else {
            res.status(400).send(`invalid student id ${req.params.custemerId}`)
        }
    } catch (error) {
        next(error);
    }
});



module.exports = router;