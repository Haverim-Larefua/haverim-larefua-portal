"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const os = __importStar(require("os"));
const PORT = 4202;
const allowedOrigins = [
    'http://fuse.local.att.com:4200',
    'http://fuse.local.att.com:3000',
    `http://${os.hostname().toLocaleLowerCase()}.intl.att.com:3000`,
    `http://${os.hostname().toLocaleLowerCase()}:3000`,
    `http://${os.hostname().toLocaleLowerCase()}.emea.att.com:3000`
];
const app = express_1.default();
app.use(cors_1.default({
    origin: allowedOrigins,
    credentials: true
}));
app.use('', router_1.default);
const server = app.listen(PORT, () => {
    const address = server.address();
    console.log('Bolt app mock server running at http://localhost:%s', address.port);
});
