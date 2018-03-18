import { default as compose } from 'lodash/fp/compose';
import { default as get } from 'lodash/fp/get';
import { default as isFunction } from 'lodash/fp/isFunction';
import { default as wrapClassList } from 'classlist';

type ElementFeatureCheck = (element: Element) => boolean;

const classListImplemented: ElementFeatureCheck = compose(
  isFunction,
  get(['classList', 'add']),
);

export class ClassList {
  private readonly classListImpl;

  constructor(domElement: Element) {
    if (classListImplemented(domElement)) {
      this.classListImpl = domElement.classList;
    } else {
      this.classListImpl = wrapClassList(domElement);
    }
  }

  add(newClass: string) {
    this.classListImpl.add(newClass);
  }

  remove(unwantedClass: string) {
    this.classListImpl.remove(unwantedClass);
  }
}
