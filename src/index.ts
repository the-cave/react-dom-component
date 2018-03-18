import { ComponentType as Component } from 'react';
import { createStore } from 'redux';
import { mountComponentFactory } from './implementations/mountComponent';
import { renderFactory } from './implementations/render';
import {
  DelegateElement,
  ElementCreator,
} from './interface';
import {
  CleaningHandler,
  MountType,
  RenderingHandler,
  metaKey,
  reducer,
} from './internal';

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
