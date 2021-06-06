import { Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';
import { Element } from './model/element.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public elements$: Observable<Array<Element>>;
  public selected: Element;
  public hasError = false;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elements$ = this.mainService.getAllElements().pipe(
      catchError((err) => {
        this.hasError = true;
        return throwError(err);
      })
    );
  }

  onSelected(element: Element): void {
    this.selected = element;
  }
}
