import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { ElementType } from 'src/app/model/element-type.model';
import { Element } from 'src/app/model/element.model';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  _destroyed$: Subject<boolean> = new Subject<boolean>();

  @Input()
  public set elements(elements: Array<Element>) {
    /** We want to show same type elements in same column */
    elements.forEach((element) => {
      const type = element.type.split('@').shift();
      this.elementTypeMap[type] ? this.elementTypeMap[type].push(element) : (this.elementTypeMap[type] = [element]);
      this.elementCountPerType[type] = this.elementTypeMap[type].length;
    });
  }

  @Output()
  public selected: EventEmitter<string> = new EventEmitter<string>();

  public elementTypeMap: { [type: string]: Array<Element> } = {};
  public elementTypes: Array<ElementType> = [];
  public elementCountPerType: { [type: string]: number } = {};
  public selectedElement: Element = null;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.rebuildAllElementTypes();
  }

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element) {
    if (element) {
      this.selected.emit(element.uri);
      this.selectedElement = element;
    }
  }

  private rebuildAllElementTypes() {
    this.mainService
      .getAllElementTypes()
      .pipe(
        takeUntil(this._destroyed$),
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        res.forEach((type) => {
          const _ =
            this.elementTypes.find((et) => et.uri === type.uri.split('@').shift()) ||
            this.elementTypes.push({
              ...type,
              uri: type.uri.split('@').shift()
            });
        });
      });
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
