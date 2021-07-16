export class EnvironmentError extends Error {
  constructor(name: string) {
    super(`${name} has not been set`);
    Object.setPrototypeOf(this, EnvironmentError.prototype);
  }
}
