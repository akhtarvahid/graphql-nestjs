import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';

export const swaggerConfig = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('hashnode Service')
        .setDescription('Hashnode Service Documentation')
        .setVersion('1.0')
        .addBearerAuth(
            { type: 'http', in: 'header', bearerFormat: 'JWT', scheme: 'Bearer', name: 'Authorization' },
            'token',
          )
        
        .build();
    const document = SwaggerModule.createDocument(app, config);

    const openapiDir = './openapi';
    if (!fs.existsSync(openapiDir)) {
        fs.mkdirSync(openapiDir);
    }
    fs.writeFileSync(`${openapiDir}/swagger.yaml`, yaml.dump(document));

    SwaggerModule.setup('api', app, document);
};
