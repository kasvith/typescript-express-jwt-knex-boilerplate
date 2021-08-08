import { injectable } from 'inversify';

@injectable()
export class Test {
  constructor() {
    console.log('test2');
  }

  message(): string {
    return 'helo';
  }
}
