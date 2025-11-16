import express from 'express';
import chalk from 'chalk';
import path from 'node:path';
import expressBasicAuth from 'express-basic-auth';
import config from './config.js';

const auth = expressBasicAuth(config);

chalk.default = chalk; // Create alias to chalk (chalk.default.green now refers to chalk.green instad of undefined)

const app = express();

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/f-777', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public', 'f-777.html'));
});

app.use(express.static('public', {
    redirect: false
}));

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'errors', '404.html'));
});

const PORT = process.env.PORT || 8080;

console.log(chalk.blue(`Starting server on port ${PORT}`));
app.listen(PORT, () => {
    console.log(chalk.green(`Server started on port ${PORT}`));
});
