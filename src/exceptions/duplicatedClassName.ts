import { ComponentType as Component } from 'react';
import { BaseException } from './base';

export class DuplicatedClassNameException extends BaseException {
  constructor(public readonly componentList: Component[]) {
    super('Multiple components use the same selector class name');
  }
}
