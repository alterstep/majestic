import { observable, computed } from 'mobx';
import { Status } from './types/JestRepoter';

export default class It {
  @observable public name: string;
  @observable public status: Status;
  @observable public failureMessage: string = '';
  @observable public executing: boolean = false;
  @observable public timeTaken: number = 0;
  @observable public updatingSnapshot: boolean = false;

  constructor(name: string) {
    this.name = name;
  }

  startExecting() {
    this.executing = true;
  }

  stopExecuting() {
    this.executing = false;
  }

  setTimeTaken(timeTaken: number) {
    this.timeTaken = timeTaken;
  }

  public updateSnapshot(promise: Promise<any>) {
    this.updatingSnapshot = true;
    promise.then(() => {
      this.updatingSnapshot = false;
      this.failureMessage = '';
      this.status = 'passed';
    });
  }

  @computed
  public get isSnapshotFailure() {
    if (!this.failureMessage) {
      return false;
    }
    return this.failureMessage.includes('not match stored snapshot');
  }
}
