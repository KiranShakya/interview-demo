import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit {
  @Input()
  public element: Element;

  public elementTypes: Array<ElementType>;

  constructor(private readonly mainService: MainService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    (async () => {
      this.elementTypes = await this.mainService.getAllElementTypes().toPromise();
      this.changeDetector.markForCheck();
    })();
  }
}
