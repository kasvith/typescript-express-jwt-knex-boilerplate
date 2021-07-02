import { IProvider } from './interfaces/Provider';
import express, { Application } from 'express';
import { Config } from '../config/Config';

class App {
  providers: IProvider[] = [];
  app: Application;
  config: Config;

  constructor(config: Config) {
    this.config = config;
    this.app = express();
  }

  register(provider: IProvider): void {
    this.providers.push(provider);
  }

  initializeDefaultMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeProviders(): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].initialize();
    }
  }

  start(): void {
    try {
      this.initializeProviders();

      this.initializeDefaultMiddlewares();

      this.app.listen(this.config.port, async () => {
        console.log('working');
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default App;
