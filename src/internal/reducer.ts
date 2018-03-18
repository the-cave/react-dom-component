import { default as difference } from 'lodash/fp/difference';
import { default as omit } from 'lodash/fp/omit';
import { COMPONENT_MOUNTED, COMPONENT_UNMOUNTED } from './constants';
import { Reducer } from "redux";

const initialState = [];
const omitActionType = omit(['type']);

export const reducer: Reducer<any> = (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_MOUNTED:
      return [...state, omitActionType(action)];
    case COMPONENT_UNMOUNTED:
      if (action.cleanupList.length > 0) {
        return difference(state, action.cleanupList);
      }
      return state;
    default:
      return state;
  }
};
