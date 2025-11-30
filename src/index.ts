// Import system related modules
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(path.resolve(), '.env')});

// Import necessary modules
import express, {Express} from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Import Swagger UI and YAML parser
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';

// Express app setup
const app: Express = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Setup swagger-ui-express for API documentation
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
        yaml.parse(fs.readFileSync(
            path.join(path.resolve(), 'openapi.yaml'), 'utf8'
        ))
    )
)

// Define a routes



// Define a server port
const PORT: string|3000 = process.env.HTTP_PORT || 3000;
app.listen(PORT, (): void => {
    console.log(`Server is running at http://localhost:${PORT}`);
});