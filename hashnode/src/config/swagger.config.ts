import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as yaml from 'js-yaml';

export const swaggerConfig = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle('TIP hashnode Service')
        .setDescription('A hashnode Service Provider')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    const openapiDir = './openapi';
    if (!fs.existsSync(openapiDir)) {
        fs.mkdirSync(openapiDir);
    }
    fs.writeFileSync(`${openapiDir}/api_spec.yaml`, yaml.dump(document));

    SwaggerModule.setup('api', app, document);
};
