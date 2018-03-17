import { BaseException } from './base';
import { ComponentType as Component } from "react";

export class DuplicateClassNameException extends BaseException {
  constructor(public readonly componentList: Component[]) {
    super("Multiple components use the same selector class name");
  }
}
