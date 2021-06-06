import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ElementType } from 'src/app/model/element-type.model';
import { Element } from 'src/app/model/element.model';
import { DataBuildService } from 'src/app/services/data-build.service';

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
  public hasError = false;
  public isLoading = false;

  constructor(private readonly mainService: MainService, private dataBuildService: DataBuildService) {}

  ngOnInit() {
    this.listAllElementTypes();
  }

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element): void {
    if (element) {
      this.selected.emit(element);
      this.selectedElement = element;
    }
  }

  private listAllElementTypes(): void {
    this.isLoading = true;
    this.mainService
      .getAllElementTypes()
      .pipe(takeUntil(this._destroyed$))
      .subscribe(
        (elementTypes) => {
          this.elementTypes = this.dataBuildService.rebuildAllElementTypes(elementTypes);
          this.isLoading = false;
        },
        (err) => {
          this.hasError = true;
          this.isLoading = false;
        }
      );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
