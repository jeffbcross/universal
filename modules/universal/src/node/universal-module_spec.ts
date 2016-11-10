import { Component, NgModule, NgModuleRef } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from './universal-module';
import { platformDynamicServer } from '@angular/platform-server';
import { Jsonp } from '@angular/http';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { ORIGIN_URL } from 'platform-node';

@Component({
  selector: 'wat',
  styles: [`
    div {
      background-color: red;
    }
  `],
  template: `
    <div>
      Hello World
    </div>
  `
})
export class Wat {
  constructor () {

  }
}

@Component({
  selector: 'app',
  styles: [`
    div {
      background-color: green;
    }
  `],
  template: `
    <div>hello world!!!</div>
    <pre>{{ response }}</pre>
    <div>
      <input id="myInput" [(ngModel)]="wat">
      Hello World
      {{ wat }}
      <div *ngIf="toggle">
        <wat></wat>
      </div>
      <button (click)="onWat($event)">Wat</button>
      <another-component></another-component>
    </div>
  `
})
export class App {
  wat = 'yolo';
  response = {};
  toggle = false;
  onWat() {
    this.toggle = !this.toggle;
  }
  constructor(public jsonp: Jsonp) {
  }
}

@Component({
  selector: 'another-component',
  styles: [`
    h1 {
      background-color: red;
    }
  `],
  template: `
    <h1>SERVER-RENDERED</h1>
  `
})
export class AnotherComponent {}

@NgModule({
  bootstrap: [ App, AnotherComponent ],
  declarations: [ App, Wat, AnotherComponent ],
  imports: [
    UniversalModule,
    CommonModule,
    // UniversalModule.withConfig({
    //   document: document,
    //   originUrl: 'http://localhost:3000',
    //   baseUrl: '/',
    //   requestUrl: '/',
    //   // preboot: false,
    //   preboot: { appRoot: ['app'], uglify: true },
    // }),
    FormsModule
  ]
})
export class MainModule {
  ngOnInit() {
    console.log('ngOnInit');
  }
  // ngDoCheck() {
  //   console.log('ngDoCheck');
  //   return true;
  // }
  ngOnStable() {
    console.log('ngOnStable');
  }
  ngOnRendered() {
    console.log('ngOnRendered');
  }
}

describe('Universal module', () => {
  describe('withConfig()', () => {
    it('should return an object with ngModule and providers', () => {
      const withConfig = UniversalModule.withConfig();
      expect(withConfig.ngModule).toBe(UniversalModule);
      expect(withConfig.providers).toEqual([]);
    });
  });

  describe('serialize', () => {
    fit('should serialize', (done) => {
      const platform = platformDynamicServer([
        { provide: APP_BASE_HREF, useValue: 'localhost' },
        { provide: ORIGIN_URL, useValue: '/'}
      ]);
      writeBody(`
        <app>
          Loading...
        </app>
      `);
      platform
        .bootstrapModule(MainModule)
        // .serializeModule(MainModule, config)
        .then((moduleRef: NgModuleRef<MainModule>) => {
          // console.log('\n -- serializeModule FINISHED --');
          console.log('bootstrapped moduleRef!');
          return moduleRef;
        })
        .then(done, done.fail);
    });
  });
});

function writeBody(html: string): any {
  var dom = __platform_browser_private__.getDOM();
  var doc = dom.defaultDoc();
  var body = dom.querySelector(doc, 'body');
  dom.setInnerHTML(body, html);
  return doc;

}
