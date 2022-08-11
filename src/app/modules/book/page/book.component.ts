import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Element } from 'src/app/data/book/schema/element.model';
import { BookService } from 'src/app/data/book/service/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public elements$: Observable<Array<Element>>;
  public isError: boolean = false;
  public selected: Element;

  constructor(private readonly bookService: BookService) {}

  ngOnInit() {
    this.elements$ = this.bookService.getAllElements().pipe(
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
