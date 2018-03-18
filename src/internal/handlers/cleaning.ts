import * as ReactDOM from 'react-dom';
import { Store } from 'redux';
import { componentUnmounted } from '../actions';
import { ClassList } from '../classes';
import { markerClass } from '../constants';
import { Handler, MountInfo } from '../definitions';
import { DelegateElement } from '../../interface';

export class CleaningHandler implements Handler {
  private mountList: MountInfo[];

  constructor(private readonly store: Store<any>) {
    this.mountList = this.store.getState();
    store.subscribe(() =>
      this.mountList = this.store.getState(),
    );
  }

  handle(delegateElement: DelegateElement) {
    const mountList = this.mountList;
    const cleanupList: MountInfo[] = [];
    for (
      let iterateIndex = 0;
      iterateIndex < mountList.length;
      iterateIndex++
    ) {
      const mountInfo = mountList[iterateIndex];
      const {
        monitorPoint,
        mountPoint,
      } = mountInfo;
      if (!delegateElement.contains(monitorPoint)) {
        // clean up
        ReactDOM.unmountComponentAtNode(mountPoint);
        const classList = new ClassList(monitorPoint);
        classList.remove(markerClass);
        cleanupList.push(mountInfo);
      }
    }
    this.store.dispatch(
      componentUnmounted(cleanupList),
    );
  }
}
