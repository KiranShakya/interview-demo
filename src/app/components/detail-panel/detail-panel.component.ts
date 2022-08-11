import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

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

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elementTypes$ = this.mainService.getAllElementTypes().pipe(
      catchError((err) => {
        this.isError = true;
        return of(err);
      })
    );
  }
}
