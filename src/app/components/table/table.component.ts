import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Element, ElementType, MainService } from 'src/app/services/main.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject<void>();

  @Input()
  public set elements(elements: Array<Element>) {
    if (!elements) { return; }
    /** We want to show same type elements in same column */
    elements.forEach((element) => {
      const type = this.takeFirstUriWord(element.type);
      const found = this.elementTypeMap[type];
      this.elementTypeMap[type] = [...(found || []), element];
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

  ngOnInit(): void {
    this.initElemTypes();
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }

  /**
   * split input text by @ char and returns first elem if found.
   * @param text input text to split by `@`
   */
  private readonly takeFirstUriWord = (text): string => (text || '').split('@').shift();

  private initElemTypes = (): void => {
    this.mainService.getAllElementTypes()
      .pipe(
        map(types => types.reduce((accum, el) => {
          const elUriWord = this.takeFirstUriWord(el.uri);
          // don't push duplicate elem
          if (!accum.some(t => this.takeFirstUriWord(t.uri) === elUriWord)) {
            accum.push({...el, uri: elUriWord});
          }
          return accum;
          }, [] as ElementType[])),
        takeUntil(this.toDestroy$)
      ).subscribe({
      next: types => this.elementTypes = types,
      error: ex => {
        // TODO: do something with error
      }
    });
  }

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element): void {
    if (element) {
      this.selected.emit(element.uri);
      this.selectedElement = element;
    }
  }
}
