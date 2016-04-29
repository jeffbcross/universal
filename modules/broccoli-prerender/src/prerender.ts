import 'angular2-universal-polyfills';
import {Bootloader} from 'angular2-universal';

const fse = require('fs-extra');
const path = require('path');
const BroccoliPlugin:BroccoliPluginConstructor = require('broccoli-caching-writer');

export interface BroccoliPlugin {
}

interface BroccoliPluginConstructor {
  new(inputNodes:any[], options?:any): BroccoliPluginConstructor
  inputPaths: string[];
  outputPath: string;
}

export class AppShellPlugin extends BroccoliPlugin {
  constructor (inputNodes, private indexPath:string, private appShellPath:string) {
    super([inputNodes]);
  }

  build() {
    var sourceHtml = fse.readFileSync(path.resolve(this.inputPaths[0], this.indexPath), 'utf-8');
    var appShellOptions = require(path.resolve(this.inputPaths[0], this.appShellPath)).options;
    var options = Object.assign(appShellOptions, {
      document: Bootloader.parseDocument(sourceHtml),
    });
    var bootloader = Bootloader.create(options);
    return bootloader.serializeApplication().then(html =>  fse.outputFileSync(path.resolve(this.outputPath, this.indexPath), html, 'utf-8'));
  }
}
