export enum MountType {
  React,
  Dom,
}

export interface ComponentMeta {
  mountType: MountType;
  className: string;
}

export interface Handler {
  handle: (...args: any[]) => void;
}

export interface MountInfo {
  mountPoint: Element;
  monitorPoint: Element;
}
