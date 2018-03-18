import { ComponentType as Component } from 'react';
import { BaseException } from './base';

export class UnmarkedComponentException extends BaseException {
  constructor(public readonly component: Component) {
    super(
      'The component list supplied contains ' +
      'a component that not marked with either ' +
      '"mountReactComponent" or "mountDomComponent"',
    );
  }
}
