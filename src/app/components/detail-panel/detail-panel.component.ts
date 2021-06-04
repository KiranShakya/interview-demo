import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Element, ElementType, MainService } from 'src/app/services/main.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit, OnDestroy {
  private readonly toDestroy$ = new Subject();
  @Input()
  public element: Element;

  public elementTypes: Array<ElementType>;

  constructor(private readonly mainService: MainService) {}

  ngOnInit(): void {
    this.initElementTypes();
  }

  private initElementTypes = (): void => {
    this.mainService.getAllElementTypes().pipe(
      takeUntil(this.toDestroy$)
    ).subscribe({
      next: elmTypes => {
        this.elementTypes = elmTypes;
      },
      error: ex => {
        // TODO: do something with error
      }
    });
  }

  ngOnDestroy(): void {
    this.toDestroy$.next();
    this.toDestroy$.complete();
  }
}
