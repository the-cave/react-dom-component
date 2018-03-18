import { default as identity } from "lodash/fp/identity";
import { ComponentType as Component } from "react";
import { createStore } from "redux";
import { ElementCreator } from "./interface";
import { renderFactory } from './render';
import { RenderingHandler } from "./internal";

export * from './markers';

export function createRenderer(
  document: ElementCreator,
) {
  const internalStore = createStore(identity);
  return {
    render: renderFactory(
      new RenderingHandler(internalStore),
    ),
  };
}
