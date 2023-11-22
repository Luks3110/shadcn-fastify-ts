import 'reflect-metadata';

import UserRoute from '@interface/routes/user.route';
import App from '@infrastructure/webserver/server';
import { container } from '@application/core/container';
import { userSchemas } from '@domain/validation/user.schema';
import EmployeeRoute from '@interface/routes/employee.route';
import { employeeSchemas } from '@domain/validation/employee.schema';

const userRoute = container.resolve(UserRoute);
const employeeRoute = container.resolve(EmployeeRoute);

const schemas = [...userSchemas, ...employeeSchemas];

export const app = new App({
  routes: [userRoute, employeeRoute],
});

for (const schema of schemas) {
  app.app.addSchema(schema);
}

app.listen();
