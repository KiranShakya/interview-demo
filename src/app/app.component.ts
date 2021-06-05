import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { Element } from './model/element.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public elements: Array<Element>;
  public selected: Element;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    (async () => {
      this.elements = await this.mainService.getAllElements().toPromise();
    })();
  }
  onSelected(elementUri: string) {
    this.selected = this.elements.find(el => el.uri === elementUri);
  }
}
