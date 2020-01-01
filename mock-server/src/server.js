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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var router_1 = __importDefault(require("./router"));
var os = __importStar(require("os"));
var PORT = 4202;
var allowedOrigins = [
    'http://fuse.local.att.com:4200',
    'http://fuse.local.att.com:3000',
    "http://" + os.hostname().toLocaleLowerCase() + ".intl.att.com:3000",
    "http://" + os.hostname().toLocaleLowerCase() + ":3000",
    "http://" + os.hostname().toLocaleLowerCase() + ".emea.att.com:3000"
];
var app = express_1.default();
app.use(cors_1.default({
    origin: allowedOrigins,
    credentials: true
}));
app.use('', router_1.default);
var server = app.listen(PORT, function () {
    var address = server.address();
    console.log('Bolt app mock server running at http://localhost:%s', address.port);
});
//# sourceMappingURL=server.js.map