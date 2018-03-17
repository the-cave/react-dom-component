import { RENDER_COMPONENT } from './constants';
import { ComponentType as Component } from "react";
import { AnyAction } from "redux";

export function renderComponent(
  markedComponent: Component,
  targetElement: Element,
): AnyAction {
  return {
    type: RENDER_COMPONENT,
    component: markedComponent,
    element: targetElement,
  };
}
