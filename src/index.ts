import { ComponentType as Component } from 'react';
import { createStore } from 'redux';
import {
  DelegateElement,
  ElementCreator,
} from './interface';
import {
  CleaningHandler,
  RenderingHandler,
  reducer,
} from './internal';
import { renderFactory } from './render';

export * from './implementations/markers';

export function createRenderer(
  document: ElementCreator,
) {
  const internalStore = createStore(reducer);
  return {
    render: renderFactory(
      new RenderingHandler(
        internalStore,
        document,
      ),
      new CleaningHandler(
        internalStore,
      ),
    ),
  };
}
