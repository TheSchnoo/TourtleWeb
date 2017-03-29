import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TourDataService } from './shared/services/tour-data-service.service';
import { HomeComponent, BeaconUpdateDialog } from './home/home.component';
import { MDL } from './MaterialDesignLiteUpgradeElement';
import { MaterialModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BeaconUpdateDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    
  ],
  providers: [TourDataService],
  bootstrap: [AppComponent],
  entryComponents: [BeaconUpdateDialog]
})
export class AppModule { }
