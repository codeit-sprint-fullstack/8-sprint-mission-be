"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import system related modules
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(path_1.default.resolve(), '.env') });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Import Swagger UI and YAML parser
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
// Express app setup
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Setup swagger-ui-express for API documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(yaml_1.default.parse(fs_1.default.readFileSync(path_1.default.join(path_1.default.resolve(), 'openapi.yaml'), 'utf8'))));
// Define a routes
// Define a server port
const PORT = process.env.HTTP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
