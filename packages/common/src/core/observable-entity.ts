import { Observer } from '../interfaces/observer';

abstract class ObservableEntity {
  protected observers: Observer<ObservableEntity>[] = [];

  attach(observer: Observer<ObservableEntity>): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer<ObservableEntity>): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

export { ObservableEntity };
