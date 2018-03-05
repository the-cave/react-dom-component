import { default as setStatic } from "recompose/setStatic";
import { MountComponent } from "./interface";

export function mountComponentFactory(
  staticKey: string,
  mountType: string,
): MountComponent {
  return function mountComponent(
    className: string,
  ) {
    return setStatic(staticKey, {
      mountType,
      className,
    });
  };
}
