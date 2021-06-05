import { Injectable } from '@angular/core';
import { ElementType } from '../model/element-type.model';

@Injectable({
  providedIn: 'root'
})
export class DataBuildService {
  rebuildAllElementTypes(elementTypes: Array<ElementType>): Array<ElementType> {
    let _elementTypes = [];
    elementTypes.forEach((type) => {
      const _ =
        _elementTypes.find((et) => et.uri === type.uri.split('@').shift()) ||
        _elementTypes.push({
          ...type,
          uri: type.uri.split('@').shift()
        });
    });
    return _elementTypes;
  }
}
