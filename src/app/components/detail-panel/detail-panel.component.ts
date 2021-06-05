import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ElementType } from 'src/app/model/element-type.model';
import { Element } from 'src/app/model/element.model';
import { Observable } from 'rxjs';

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

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elementTypes$ = this.mainService.getAllElementTypes();
  }
}
