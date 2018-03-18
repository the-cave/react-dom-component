import { ComponentType as Component } from 'react';
import { createStore } from 'redux';
import { ElementCreator } from './interface';
import { renderFactory } from './render';
import { DelegateElement } from './interface';
import {
  CleaningHandler,
  RenderingHandler,
  reducer,
} from './internal';

export * from './markers';

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
