const express = require('express');
const cors = require('cors');
const customersRoute = require('./routes/CustomersRoute');
const mursheRoute = require('./routes/MursheRoute');
const paturRoute = require('./routes/PaturRoute');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/customers', customersRoute);
app.use('/api/mursheDetalis', mursheRoute);
app.use('/api/paturDetalis', paturRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('An error occurred, please try again later. If the error persists, contact support.');
});

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});
