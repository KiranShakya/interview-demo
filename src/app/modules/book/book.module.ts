import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './page/book.component';
import { TableComponent } from './page/table/table.component';
import { DetailPanelComponent } from './page/detail-panel/detail-panel.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BookComponent, TableComponent, DetailPanelComponent],
  imports: [CommonModule, BookRoutingModule, SharedModule]
})
export class BookModule {}
