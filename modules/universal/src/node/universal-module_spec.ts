#!/usr/bin/env node --debug=5858 --debug-brk

const foo = require('reflect-metadata');
const bar = require('../../../universal-polyfills/src/node');
console.log('foobar', foo, bar)

import { Component, NgModule, NgModuleRef } from '@angular/core';
import { CommonModule/*, APP_BASE_HREF*/ } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UniversalModule, platformUniversalDynamic } from './universal-module';
// import { platformDynamicServer } from '@angular/platform-server';
import { Jsonp, HttpModule, JsonpModule } from '@angular/http';
import { __platform_browser_private__, DOCUMENT } from '@angular/platform-browser';
import { /*ORIGIN_URL,*/ platformNodeDynamic, NodeHttpModule } from 'platform-node';
import {
  Parse5DomAdapter
} from 'platform-node/parse5-adapter';

declare var Zone;



// jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;

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
  constructor() {
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

Parse5DomAdapter.makeCurrent();

let doc;
export function makeDoc () {
  return doc;
}

@NgModule({
  bootstrap: [ App, AnotherComponent ],
  declarations: [ App, Wat, AnotherComponent ],
  imports: [
    // UniversalModule,
    CommonModule,
    UniversalModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    { provide: DOCUMENT, useFactory: makeDoc}
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

// describe('Universal module', () => {
//   beforeEach(() => {
//     const dom = __platform_browser_private__.getDOM();
//     doc = dom.createHtmlDocument();
//     Zone.current._properties['document'] = doc;
//   });

//   describe('withConfig()', () => {
//     it('should return an object with ngModule and providers', () => {
//       const withConfig = UniversalModule.withConfig();
//       expect(withConfig.ngModule).toBe(UniversalModule);
//       expect(withConfig.providers).toEqual([]);
//     });
//   });

//   describe('serialize', () => {
//     fit('should serialize', (done) => {
//       const platform = platformUniversalDynamic();
//       writeBody(`
//         <app>
//           Loading...
//         </app>
//       `);
//       platform
//         .serializeModule(MainModule)
//         .then((html: string) => {
//           console.log('bootstrapped moduleRef!', html);
//           return html;
//         })
//         .then(done, done.fail);
//     }, 2147483647);
//   });
// });

    const dom = __platform_browser_private__.getDOM();
    doc = dom.createHtmlDocument();
    Zone.current._properties['document'] = doc;
    const platform = platformUniversalDynamic();
      writeBody(`
        <app>
          Loading...
        </app>
      `);
      platform
        .serializeModule(MainModule)
        .then((html: string) => {
          console.log('bootstrapped moduleRef!', html);
          return html;
        })

function writeBody(html: string): any {
  var dom = __platform_browser_private__.getDOM();
  var doc = dom.defaultDoc();
  var body = dom.querySelector(doc, 'body');
  dom.setInnerHTML(body, html);
  return doc;

}