import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MyCollection } from '../mockData/elements';
import { JapaneseElementTypes, LocalElementTypes } from '../mockData/elementTypes';
import { Element } from '../schema/element.model';
import { ElementType } from '../schema/element-type.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  /** Cached mock data */
  private readonly elementTypes: Array<ElementType> = LocalElementTypes.concat(JapaneseElementTypes);
  private readonly allElements: Array<Element> = MyCollection;

  constructor() {}

  public getAllElements(): Observable<Array<Element>> {
    return of(this.allElements).pipe(delay(500));
  }

  public getAllElementTypes(): Observable<Array<ElementType>> {
    return of(this.elementTypes);
  }
}
