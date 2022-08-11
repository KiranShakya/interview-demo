import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Element, MainService } from './services/main.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public elements$: Observable<Array<Element>>;
  public isError: boolean = false;
  public selected: Element;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elements$ = this.mainService.getAllElements().pipe(
      catchError((err) => {
        this.isError = true;
        return throwError(err);
      })
    );
  }
  onSelected(element: Element) {
    this.selected = element;
  }
}
