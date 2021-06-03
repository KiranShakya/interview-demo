import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit {
  @Input()
  public element: Element;

  public elementTypes: Array<ElementType>;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    (async () => {
      this.elementTypes = await this.mainService.getAllElementTypes().toPromise();
    })();
  }
}
