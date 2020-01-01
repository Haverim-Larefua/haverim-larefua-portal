import express from 'express';
import cors from 'cors';
import router from './router';
import * as os from 'os';
import { AddressInfo } from 'net';
const PORT = 4202;

const allowedOrigins = [
    'http://fuse.local.att.com:4200',
    'http://fuse.local.att.com:3000',
    `http://${os.hostname().toLocaleLowerCase()}.intl.att.com:3000`,
    `http://${os.hostname().toLocaleLowerCase()}:3000`,
    `http://${os.hostname().toLocaleLowerCase()}.emea.att.com:3000`
];
const app = express();
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use('', router);

const server = app.listen(PORT, () => {
    const address: AddressInfo = <AddressInfo>server.address();
    console.log('Haverim-Larefua app mock server running at http://localhost:%s', address.port);
});
