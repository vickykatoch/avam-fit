# AvamFit

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## RXJS retryWhen with timeout
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/timeout';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

onStart() {
    const url = "http://localhost:8000/api/users/Y312876";
    this.http.get(url)
      .timeout(1000)
      .retryWhen(errorObs => {
        return errorObs.flatMap(error => {
          this.logger.error('Error : ', error.message);
          return Observable.of(error.status).delay(1000);
        }).take(3).concat(Observable.throw({ error: 'There was an error even after 3 retries' }));
      }).subscribe(
      (d) => this.logger.info('Next => ', d),
      (e) => this.logger.error('Error Last : ', e),
      () => this.logger.info('Complete')
      );
  }
