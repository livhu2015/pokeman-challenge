import { Options } from 'swagger-jsdoc';
import { join } from 'path';
const path = join(__dirname, '../controllers/**/*.ts')
console.log(path)
export const swaggerOptions:Options  = {
    definition: {
        info: {
          title: 'Pocket Monster',
          version: '1.0.0',
        },
      },
    apis: [path] //Path to the API handle folder
};

