import { inject, injectable } from 'inversify';
import { Test } from '@/Test';

@injectable()
export class Test2 {
  constructor(@inject(Test) private test: Test) {
    console.log('test 2');
  }
}
