import type { SetStoreFunction } from "solid-js/store";
import { createStore } from "solid-js/store";

import { type Hydrators, hydrate } from "../hydration/index.js";

/**
 * Wrapper around Solid.js store
 */
export class ObjectStorage<T> {
  private store: Record<string, T>;
  readonly set: SetStoreFunction<Record<string, T>>;

  /**
   * Create new object storage
   */
  constructor() {
    const [store, setStore] = createStore({});
    this.store = store as never;
    this.set = setStore;
    this.get = this.get.bind(this);
  }

  /**
   * Get object by ID
   * @param id ID
   * @returns Object
   */
  get(id: string): T | undefined {
    return this.store[id];
  }

  /**
   * Hydrate some data into storage
   * @param id ID
   * @param type Hydration type
   * @param context Context
   * @param data Input Data
   */
  hydrate(
    id: string,
    type: keyof Hydrators,
    context: unknown,
    data?: unknown
  ): void {
    if (data) {
      data = { partial: false, ...data };
      this.set(id, hydrate(type, data as never, context, true) as T);
    }
  }
}
