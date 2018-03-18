import { default as setStatic } from 'recompose/setStatic';
import { IllegalClassNameException } from '../exceptions';
import { MountComponent } from '../interface';
import { ComponentMeta, MountType } from '../internal';

const classNamePattern = /^(?:-[_a-zA-Z]|[_a-zA-Z][-_a-zA-Z0-9])[-_a-zA-Z0-9]*$/;

export function mountComponentFactory(
  staticKey: string,
  mountType: MountType,
): MountComponent {
  return function mountComponent(
    className: string,
  ) {
    if (!classNamePattern.test(className)) {
      throw new IllegalClassNameException(className);
    }
    const meta: ComponentMeta = {
      mountType,
      className,
    };
    return setStatic(staticKey, meta);
  };
}
