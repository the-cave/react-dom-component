import { AnyAction } from 'redux';
import {
  COMPONENT_MOUNTED,
  COMPONENT_UNMOUNTED,
} from './constants';
import { MountInfo } from './definitions';

export function componentMounted(
  mountPoint: Element,
  monitorPoint: Element,
): AnyAction {
  return {
    type: COMPONENT_MOUNTED,
    mountPoint,
    monitorPoint,
  };
}

export function componentUnmounted(
  cleanupList: MountInfo[],
): AnyAction {
  return {
    type: COMPONENT_UNMOUNTED,
    cleanupList,
  };
}
