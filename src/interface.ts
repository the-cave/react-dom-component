import { ComponentType as Component } from "react";

export type MountComponent = (
  containerClassName: string,
) => (
  baseComponent: Component,
) => Component;

export interface ElementCreator {
  createElement: (tagName: string) => Element;
}
