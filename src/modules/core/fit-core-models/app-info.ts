export class ApplicationInfo {

  private _name: string;
  private _user: string;
  private _env: string;
  private _region: string;
  private _baseUrl: string;
  private _url: string;

  constructor(appName: string, user: string, env: string, region: string, baseUrl: string, url: string) {
    this._name = appName;
    this._user = user;
    this._env = env;
    this._region = region;
    this._url = url;
    this._baseUrl = baseUrl;
  }

  get name(): string {
    return this._name;
  }
  get user(): string {
    return this._user;
  }
  get env(): string {
    return this._env;
  }
  get region(): string {
    return this._region;
  }
  get baseUrl(): string {
    return this._baseUrl;
  }
  get url(): string {
    return this._url;
  }
}
