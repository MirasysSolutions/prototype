import { ObservableEntity } from './../core/observable-entity';

interface Observer<T extends ObservableEntity> {
  update(subject: T): void;
}

export { Observer };
