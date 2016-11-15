import { Component, NgModule, NgModuleRef } from '@angular/core';
import { CommonModule/*, APP_BASE_HREF*/ } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from './universal-module';
// import { platformDynamicServer } from '@angular/platform-server';
import { Jsonp } from '@angular/http';
import { __platform_browser_private__ } from '@angular/platform-browser';
import { /*ORIGIN_URL,*/ platformNodeDynamic } from 'platform-node';
import {
  Parse5DomAdapter
} from 'platform-node/parse5-adapter';

declare var Zone;

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
    // UniversalModule,
    CommonModule,
    UniversalModule,
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
  beforeEach(() => {
    Parse5DomAdapter.makeCurrent();
    const dom = __platform_browser_private__.getDOM();
    Zone.current._properties['document'] = dom.createHtmlDocument();
  });

  describe('withConfig()', () => {
    it('should return an object with ngModule and providers', () => {
      const withConfig = UniversalModule.withConfig();
      expect(withConfig.ngModule).toBe(UniversalModule);
      expect(withConfig.providers).toEqual([]);
    });
  });

  describe('serialize', () => {
    fit('should serialize', (done) => {
      const platform = platformNodeDynamic()//.bootstrapModule(MainModule)
      // const platform = platformDynamicServer([
      //   { provide: APP_BASE_HREF, useValue: 'localhost' },
      //   { provide: ORIGIN_URL, useValue: '/'}
      // ]);
      writeBody(`
        <app>
          Loading...
        </app>
      `);
      platform
        .bootstrapModule(MainModule)
        // .then((ngModuleRef: NgModuleRef) => {
        //   // return platform.serialize
        // })
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
