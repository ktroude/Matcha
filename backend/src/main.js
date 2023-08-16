"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path_1 = require("path");
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions: {
            key: fs.readFileSync(path_1.default.join(__dirname, '../certificates/server.key')),
            cert: fs.readFileSync(path_1.default.join(__dirname, '../certificates/server.crt')),
        },
    });
    const reflector = new core_1.Reflector();
    app.use(cors({
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }));
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map