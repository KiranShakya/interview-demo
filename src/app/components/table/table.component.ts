import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Element, ElementType, MainService } from 'src/app/services/main.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input()
  public set elements(elements: Array<Element>) {
    /** We want to show same type elements in same column */
    elements.forEach((element) => {
      const elementType = element.type.split('@').shift();
      this.elementTypeMap[elementType] ? this.elementTypeMap[elementType].push(element) : (this.elementTypeMap[elementType] = [element]);
      this.elementCountPerType[elementType] = this.elementTypeMap[elementType].length;
    });
    this.elementRows = new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  @Output()
  public selected: EventEmitter<string> = new EventEmitter<string>();

  public elementTypeMap: { [type: string]: Array<Element> } = {};
  public elementTypes: Array<ElementType> = [];
  public elementCountPerType: { [type: string]: number } = {};
  public selectedElement: Element = null;
  public elementRows = [];
  private getElementTypesSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.buildElementTypes();
    (async () => {
      await (
        await this.mainService.getAllElementTypes().toPromise()
      ).forEach((type) => {
        const _ =
          this.elementTypes.find((et) => et.uri === type.uri.split('@').shift()) ||
          this.elementTypes.push({
            ...type,
            uri: type.uri.split('@').shift()
          });
      });
    })();
  }

  private buildElementTypes(): void {
    this.getElementTypesSubscription = this.mainService.getAllElementTypes()
    .pipe(map(this.buildElementType))
    .subscribe((res) => {
      this.elementTypes = res;
    }, (err) => {

    });
  }

  private buildElementType(types: ElementType[]): ElementType[] {
    const elementTypes = [];
    types.map((type) => {
      const uri = type.uri.split('@').shift();
      if (!this.elementTypes.some(elementType => elementType.uri === uri)) {
        elementTypes.push({
          ...type,
          uri
        });
      }
    });
    return elementTypes;
  }

  public onClicked(element: Element) {
    if (element) {
      this.selectedElement = element;
      this.selected.emit(element.uri);
    }
  }

  ngOnDestroy() {
    try {
      this.getElementTypesSubscription.unsubscribe();
    } catch (err) {
      // HANDLE ERROR
    }
  }
}
