import { BaseException } from './base';

export class IllegalClassNameException extends BaseException {
  constructor(className: string) {
    super(`Illegal class name "${className}" for HTML elements`);
  }
}
