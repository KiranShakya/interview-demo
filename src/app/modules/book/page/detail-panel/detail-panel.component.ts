import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Element } from 'src/app/data/book/schema/element.model';
import { ElementType } from 'src/app/data/book/schema/element-type.model';
import { BookService } from 'src/app/data/book/service/book.service';

@Component({
  selector: 'ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit {
  @Input()
  public element: Element;

  public elementTypes$: Observable<Array<ElementType>>;
  public isError = false;

  constructor(private readonly bookService: BookService) {}

  ngOnInit() {
    this.elementTypes$ = this.bookService.getAllElementTypes().pipe(
      catchError((err) => {
        this.isError = true;
        return of(err);
      })
    );
  }
}
