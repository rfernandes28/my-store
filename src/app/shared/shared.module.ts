import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from './components/img/img.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ProductComponent,
    ProductsComponent,
    ImgComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
