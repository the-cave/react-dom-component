import * as React from 'react';
import { ComponentType as Component } from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import { Handler, MountType } from '../definitions';
import { getMeta } from '../util';
import { ElementCreator } from '../../interface';

export class RenderingHandler implements Handler {
  constructor(
    private readonly store: Store<any>,
    private readonly document: ElementCreator,
  ) {
  }

  handle(component: Component, element: Element) {
    const { mountType } = getMeta(component);
    if (mountType === MountType.React) {
      this.handleReactMount(component, element);
    }
    if (mountType === MountType.Dom) {
      this.handleDomMount(component, element);
    }
  }

  private handleReactMount(
    component: Component,
    containerElement: Element,
  ) {
    ReactDOM.render(
      React.createElement(component),
      containerElement,
    );
  }

  private handleDomMount(
    component: Component,
    element: Element,
  ) {

  }
}
