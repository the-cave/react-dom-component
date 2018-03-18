import { ComponentType as Component } from "react";
import { Store } from "redux";
import { Handler, MountType } from "../definitions";
import { getMeta } from "../util";

export class RenderingHandler implements Handler {
  constructor(private readonly store: Store<any>) {
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
    element: Element,
  ) {

  }

  private handleDomMount(
    component: Component,
    element: Element,
  ) {

  }
}
