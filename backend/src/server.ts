import 'reflect-metadata';

import App from '@infrastructure/webserver/server';
import { userSchemas } from '@domain/validation/user.schema';
import { employeeSchemas } from '@domain/validation/employee.schema';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { withRefResolver } from 'fastify-zod';
import { version } from '../package.json';
import userRoutes from '@interface/routes/user.route';
import employeeRoutes from '@interface/routes/employee.route';

const schemas = [...userSchemas, ...employeeSchemas];

(async () => {
  const app = new App();

  const server = app.app;

  await server.register(
    swagger,
    withRefResolver({
      mode: 'dynamic',
      swagger: {
        info: {
          title: 'Gertrudes API',
          version,
        },
        host: 'localhost:8000',
      },
    })
  );

  for (const schema of schemas) {
    server.addSchema(schema);
  }

  await server.register(swaggerUI, {
    routePrefix: 'docs',
  });

  server.register(userRoutes, { prefix: 'api/users' });
  server.register(employeeRoutes, { prefix: 'api/employees' });

  await server.ready();
  server.swagger();

  console.log(server.printRoutes());

  app.listen();
})();
