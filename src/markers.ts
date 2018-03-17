import { ComponentType as Component } from "react";
import { metaKey, MountType } from "./internal";
import { mountComponentFactory } from "./mountComponent";

export const mountDomComponent = mountComponentFactory(
  metaKey,
  MountType.Dom,
);
export const mountReactComponent = mountComponentFactory(
  metaKey,
  MountType.React,
);
