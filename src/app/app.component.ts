import { Component, OnInit } from '@angular/core';
import { Element, MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public elements: Array<Element>;
  public selected: Element;

  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {
     this.mainService.getAllElements().toPromise().then(
       elements => this.elements = elements
     ).catch(ex => {
       // TODO: do something with error
     });

  }
  onSelected(elementUri: string): void {
    this.selected = this.elements.find(el => el.uri === elementUri);
  }
}
