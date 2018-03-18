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
