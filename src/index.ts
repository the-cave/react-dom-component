import { default as identity } from "lodash/fp/identity";
import { ComponentType as Component } from "react";
import {
  createStore,
} from "redux";
import { ElementCreator } from "./interface";
import { mountComponentFactory } from "./mountComponent";
import { metaKey, MountType } from "./internal";
import {renderFactory} from './render';

export const mountDomComponent = mountComponentFactory(
  metaKey,
  MountType.Dom,
);
export const mountReactComponent = mountComponentFactory(
  metaKey,
  MountType.React,
);

export function createRenderer(
  document: ElementCreator,
) {
  const internalStore = createStore(identity);

  return {
    render: renderFactory(internalStore),
  };
}
