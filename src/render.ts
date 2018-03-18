import { default as compose } from "lodash/fp/compose";
import { default as find } from "lodash/fp/find";
import { default as intersectionWith } from "lodash/fp/intersectionWith";
import { default as isString } from "lodash/fp/isString";
import { default as uniq } from "lodash/fp/uniq";
import { ComponentType as Component } from "react";
import {
  DuplicatedClassNameException,
  UnmarkedComponentException,
} from "./exceptions";
import { DelegateElement } from "./interface";
import {
  ClassList,
  ComponentMeta,
  getClassName,
  getMeta,
  Handler,
  markerClass,
} from "./internal";

const isMarkedComponent = compose(
  isString,
  getClassName,
);
const findUnmarkedComponent = find(
  (component) => !isMarkedComponent(component),
);
type ComponentListTransformer =
  (componentList: Component[]) =>
    Component[];
const filterDuplicated: ComponentListTransformer =
  (componentList) => intersectionWith(
    (
      componentA: Component,
      componentB: Component,
    ) => (
      componentA
      !==
      componentB
    ) && (
      getClassName(componentA)
      ===
      getClassName(componentB)
    ),
    componentList,
    componentList,
  );

export function renderFactory(renderingHandler: Handler) {
  return function render(
    componentList: Component[],
    delegateElement: DelegateElement,
  ) {
    const compactedList: Component[] = uniq(componentList);
    const unmarkedComponent: Component = findUnmarkedComponent(
      compactedList,
    );
    if (unmarkedComponent) {
      throw new UnmarkedComponentException(unmarkedComponent);
    }
    const duplicatedComponentList = filterDuplicated(compactedList);
    if (duplicatedComponentList.length > 0) {
      throw new DuplicatedClassNameException(duplicatedComponentList);
    }
    return function update() {
      for (
        let componentIndex = 0;
        componentIndex < compactedList.length;
        componentIndex++
      ) {
        const component = compactedList[componentIndex];
        const meta: ComponentMeta = getMeta(component);
        const { className } = meta;
        const elementList = delegateElement.querySelectorAll(
          `.${className}:not(.${markerClass})`,
        );
        for (
          let elementIndex = 0;
          elementIndex < elementList.length;
          elementIndex++
        ) {
          const element = elementList.item(elementIndex);
          const classList = new ClassList(element);
          classList.add(markerClass);
          renderingHandler.handle(component, element);
        }
      }
    };
  };
}
