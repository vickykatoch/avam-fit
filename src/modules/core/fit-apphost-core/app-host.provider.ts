

export abstract class AppHostProvider {

  abstract createNewApp(options: any) : Promise<any>;
  abstract getCurrent() : any;

}
