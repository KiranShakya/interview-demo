import { OnDestroy } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Element, ElementType, MainService } from 'src/app/services/main.service';

@Component({
  selector: 'ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit, OnDestroy {
  @Input()
  public element: Element;

  public elementTypes: Array<ElementType>;

  elementSubscription: Subscription;

  constructor(private readonly mainService: MainService) { }

  ngOnInit() {
    this.elementSubscription = this.mainService.getAllElementTypes().subscribe(key => {
      this.elementTypes = key.map((x => {
        x.uri =  x.uri.split('@').shift();
        return x;
      }));
    });
  }

  ngOnDestroy(): void {
    this.elementSubscription.unsubscribe();
  }
}
