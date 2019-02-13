import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule
  ],
  entryComponents: [ EditModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
