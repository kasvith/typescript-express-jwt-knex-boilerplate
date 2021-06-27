import { IProvider } from './interfaces/Provider';
class Application {
  providers: IProvider[] = [];

  register(provider: IProvider): void {
    this.providers.push(provider);
  }

  private initializeProviders(): void {
    for (let i = 0; i < this.providers.length; i++) {
      this.providers[i].initialize();
    }
  }

  start(): void {
    this.initializeProviders();
  }
}

export default Application;
