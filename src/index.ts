import Method from "parsegraph-method";
import { arrayRemove } from "parsegraph-arrayremove";

export default class CustomEvents {
  _listeners: Method[];

  constructor() {
    this._listeners = null;
  }

  emit(...args: any): void {
    if (!this._listeners) {
      return;
    }
    this._listeners.forEach((listener) => {
      listener.apply(args);
    });
  }

  listen(func: Function, funcThisArg?: object): Method {
    if (!this._listeners) {
      this._listeners = [];
    }
    const method = new Method(func, funcThisArg);
    this._listeners.push(method);
    return method;
  }

  stopListening(method: Method): boolean {
    if (!this._listeners) {
      return false;
    }
    const removed = arrayRemove(this._listeners, method);
    if (this._listeners.length == 0) {
      this._listeners = null;
    }
    return removed;
  }
}
