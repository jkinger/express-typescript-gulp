import { Component } from '@angular/core';

@Component({
  selector: 'my-section',
  template: `<h1>Loaded {{name}} Component</h1>`,
})
export class SectionComponent { public name = 'Angular 2'; }
