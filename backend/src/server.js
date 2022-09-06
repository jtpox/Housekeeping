const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const db = require('./utils/database');
const route = require('./utils/route');
const passport = require('./utils/passport');

const argon2 = require('argon2');

const { name, version } = require('../package.json');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => res.json({
    name,
    version,
}));

app.get('/api', (req, res) => res.json({
    name,
    version,
}));

route(app);

/*
 * Authenticate to the database first, then start the API server.
 */
db.sequelize
    .authenticate()
    .then(async () => {
        // Syncing database.
        const sync = (process.env.RUNTIME === 'dev') ? db.sequelize.sync({ forced: true }) : db.sequelize.sync();
        sync
            .then(() => console.log('Synced database.'))
            .catch(err => console.error(`Failed to sync database: ${err}`));

        app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
    })
    .catch((err) => console.error(`Unable to connect to the database: ${err}`));