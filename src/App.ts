import Application from '@core/Application';
import { IAppConfig } from '@config';
import { Container } from 'inversify';
import { Router } from 'express';
import { useControllers } from '@core/utils/Controller';
import { UserController } from '@/controllers/UserController';
import { Test } from '@/Test';
import { Test2 } from '@/Test2';

class App extends Application {
  constructor() {
    super();
  }

  setup(_config: IAppConfig, container: Container): void {
    container.bind<Test>(Test).toSelf();
    container.bind<Test2>(Test2).toSelf();
  }

  setupRoutes(router: Router): void {
    useControllers(router, [UserController]);
  }
}

export default App;
