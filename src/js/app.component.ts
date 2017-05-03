import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Loaded root {{name}} App</h1>
            <my-section></my-section>`,
})
export class AppComponent { public name = 'Angular 2'; }
