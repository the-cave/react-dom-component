import { default as compose } from "lodash/fp/compose";
import { default as find } from "lodash/fp/find";
import { default as get } from "lodash/fp/get";
import { default as intersectionWith } from "lodash/fp/intersectionWith";
import { default as isString } from "lodash/fp/isString";
import { default as uniq } from "lodash/fp/uniq";
import { ComponentType as Component } from "react";
import { Store } from "redux";
import {
  DuplicatedClassNameException,
  UnmarkedComponentException,
} from "./exceptions";
import {
  ComponentMeta,
  markerClass,
  metaKey,
  renderComponent,
} from "./internal";

const getMeta = get([metaKey]);
const getClassName = compose(
  get(['className']),
  getMeta,
);

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

export function renderFactory({ dispatch }: Store<any>) {
  return function render(
    componentList: Component[],
    delegateElement: NodeSelector,
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
          dispatch(renderComponent(component, element));
        }
      }
    };
  };
}
