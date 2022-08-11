import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Element, ElementType, MainService } from 'src/app/services/main.service';
import { filterElementTypes } from 'src/app/helpers/filter-element-type';
@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
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
  public isLoading: boolean = false;
  public isError = false;

  _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this._getElementTypes();
  }

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element) {
    if (element) {
      this.selected.emit(element);
      this.selectedElement = element;
    }
  }

  private _getElementTypes(): void {
    this.isLoading = true;
    this.mainService
      .getAllElementTypes()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (elementTypes) => {
          this.elementTypes = filterElementTypes(elementTypes);
          this.isLoading = false;
        },
        (err) => {
          this.isError = true;
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
