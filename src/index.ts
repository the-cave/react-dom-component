import { default as identity } from "lodash/fp/identity";
import { ComponentType as Component } from "react";
import {
  Store,
  createStore,
} from "redux";
import { ElementCreator } from "./interface";
import { mountComponentFactory } from "./mountComponent";

const staticKey = "__react-dom-hybrid_meta";
export const mountDomComponent = mountComponentFactory(
  staticKey,
  "Dom",
);
export const mountReactComponent = mountComponentFactory(
  staticKey,
  "React",
);

export function createRenderer(
  document: ElementCreator,
  provider?: Component,
) {
  const internalStore = createStore(identity);

  return {
    render: null,
  };
}
