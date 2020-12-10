export class StorageService {
  private readonly _storage: Storage;

  constructor(storage?: any) {
    this._storage = storage || window.localStorage;
    if (!this.isSupported()) {
      throw new Error('Storage is not supported by browser!');
    }
  }

  setItem(key: string, value: any) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = this._storage.getItem(key);
    if (value) return JSON.parse(value);
    return undefined;
  }

  removeItem(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }

  isSupported() {
    let supported = true;
    if (!this._storage) {
      supported = false;
    }
    return supported;
  }
}

const localStorageService = new StorageService();
const sessionStorageService = new StorageService(window.sessionStorage);

export { localStorageService, sessionStorageService };
