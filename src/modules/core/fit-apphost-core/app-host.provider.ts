

export abstract class AppHostProvider {

  name: string;
  abstract createNewApp(url: string, name: string) : Promise<any>;
  abstract getCurrent() : any;
  abstract show(name: string): void;
  abstract showAll() : void;
}
