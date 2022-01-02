import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Element, MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public elements: Array<Element>;
  public selected: Element;
  private getElementsSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.fetchElements();
  }

  private fetchElements() {
    this.getElementsSubscription = this.mainService.getAllElements().subscribe((res) => {
      this.elements = res;
    }, (err) => {
      // HANDLE ERROR
    });
  }

  onSelected(elementUri: string) {
    this.selected = this.elements.find(el => el.uri === elementUri);
  }

  ngOnDestroy() {
    try {
      this.getElementsSubscription.unsubscribe();
    } catch (err) {
      // HANDLE ERROR
    }
  }
}
