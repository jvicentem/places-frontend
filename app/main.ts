import {Component} from '@angular/core'
import {PlacesComponent} from './places-app/PlacesComponent'

@Component({
  selector: 'ng2-app',
  template: `
        <places></places>`,
  directives: [PlacesComponent]
})

export class AppComponent{

  constructor(){
  }

}
