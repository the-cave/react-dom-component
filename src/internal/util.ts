import { default as compose } from 'lodash/fp/compose';
import { default as get } from 'lodash/fp/get';
import { ComponentType as Component } from 'react';
import { metaKey } from './constants';
import { ComponentMeta } from './definitions';

export type GetMeta = (component: Component) => ComponentMeta;
export type GetClassName = (component: Component) => string;
export const getMeta: GetMeta = get([metaKey]);
export const getClassName: GetClassName = compose(
  get(['className']),
  getMeta,
);
