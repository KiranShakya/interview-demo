import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit, OnDestroy {
  @Input()
  public element: Element;

  public elementTypes: Array<ElementType>;
  private getElementTypesSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.fetchElementTypes();
  }

  private fetchElementTypes() {
    this.getElementTypesSubscription = this.mainService.getAllElementTypes().subscribe((res) => {
      this.elementTypes = res;
    }, (err) => {
      // HANDLE ERROR
    });
  }

  ngOnDestroy() {
    try {
      this.getElementTypesSubscription.unsubscribe();
    } catch (err) {
      // HANDLE ERROR
    }
  }
}
