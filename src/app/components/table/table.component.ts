import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input()
  public set elements(elements: Array<Element>) {
    /** We want to show same type elements in same column */
    elements.forEach((element) => {
      element.type = element.type.split('@').shift();
      this.elementTypeMap[element.type] ? this.elementTypeMap[element.type].push(element) : (this.elementTypeMap[element.type] = [element]);
    });
    Object.keys(this.elementTypeMap).forEach((type) => (this.elementCountPerType[type] = this.elementTypeMap[type].length));
  }

  @Output()
  public selected: EventEmitter<string> = new EventEmitter<string>();

  public elementTypeMap: { [type: string]: Array<Element> } = {};
  public elementTypes: Array<ElementType> = [];
  public elementCountPerType: { [type: string]: number } = {};
  public selectedElement: Element = null;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
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

  public get rows(): Array<undefined> {
    return new Array(Math.max(...Object.values(this.elementCountPerType), 0));
  }

  public onClicked(element) {
    if (element) {
      this.selected.emit(element.uri);
      this.selectedElement = element;
    }
  }
}
