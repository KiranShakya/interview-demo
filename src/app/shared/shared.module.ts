import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FindByKeyValuePipe } from './pipes/find-by-key-value.pipe';

@NgModule({
  declarations: [SpinnerComponent, FindByKeyValuePipe],
  imports: [CommonModule],
  exports: [SpinnerComponent, FindByKeyValuePipe]
})
export class SharedModule {}
