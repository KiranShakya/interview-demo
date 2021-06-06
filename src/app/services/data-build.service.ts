import { Injectable } from '@angular/core';
import { ElementType } from '../model/element-type.model';

@Injectable({
  providedIn: 'root'
})
export class DataBuildService {
  rebuildAllElementTypes(elementTypes: Array<ElementType>): Array<ElementType> {
    let _elementTypes = [];

    elementTypes.forEach((type) => {
      const uri = type.uri.split('@').shift();
      const matchElementTypes = _elementTypes.find((et) => et.uri === uri);

      if (!matchElementTypes) _elementTypes.push({ ...type, uri });
    });

    return _elementTypes;
  }
}
