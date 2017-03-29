import { MdDialog, MdDialogRef } from '@angular/material';
import { ITour } from '../shared/models/tour.model';
import { TourDataService } from '../shared/services/tour-data-service.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IBeacon } from '../shared/models/beacon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  tours: ITour[]
  selectedTour: ITour
  searchTerm: String

  constructor( private _tourDataService: TourDataService,
    public dialog: MdDialog) {};

  ngOnInit() {
    this._tourDataService.getToursFromServer()
      .subscribe(tours => this.tours = tours)
    console.log("Tours are ", JSON.stringify(this.tours))
    this.selectedTour = new ITour
  }

  selected(event: ITour){
    this.selectedTour = event
    console.log("selected tour is " + JSON.stringify(this.selectedTour))
  }

  openDialog(){
    console.log('opening dialog')
    this.dialog.open(BeaconUpdateDialog)
  }

  saveBeacon(beacon: IBeacon){
    console.log("saving beacon " + JSON.stringify(beacon))
    var savePromise = this._tourDataService.saveBeacon(beacon)
    var reference = this
    savePromise.then(function(data) {
        // all loaded
        console.log("SUCCESS!!!" + JSON.stringify(data))
        // console.log("dialog is " + JSON.stringify(a.dialog))
        reference.dialog.open(BeaconUpdateDialog)
        console.log("was the dialog opened?")

        alert("Successfully updated beacon.")



      }, function(error) {
        console.log("Failure!!!" + JSON.stringify(error))
        alert("Beacon update failure.")


      });
  }

  addPOI() {
    console.log("adding POI")
    var poi: IBeacon = {
        "name": "New Name",
        "lat": 49.272235,
        "lon": -123.13517198,
        "description": "New Description",
        "imageurl": "https://res.cloudinary.com/dp5jkspfk/image/upload/v1490822329/img-20150705-wa0013_720_masxmn.jpg",
        "uuid": "B9407F30-F5F8-466E-AFF9-25556B57FE99"
    }
    this.selectedTour.beacons.push(poi)
  }
}

  @Component({
    selector: 'beacon-update-dialog',
    template: `
      <p>{{ title }}</p>
      <p>{{ message }}</p>
      <button type="button" md-raised-button 
            (click)="dialogRef.close(true)">OK</button>
      <button type="button" md-button 
            (click)="dialogRef.close()">Cancel</button>`
  })
  export class BeaconUpdateDialog{
    constructor(public dialogRef: MdDialogRef<HomeComponent>) {}
  }

  import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'poi-filter', pure:false})
export class CapitalizePipe implements PipeTransform {
  transform(value: IBeacon[], args: string): IBeacon[] {
    if (!args) {
      return value;
    } else {
      var results: IBeacon[]
      for (var i=0; i < value.length; i++) {
        var beacon = value[i]
        if (beacon.name == args) {
          results.push(beacon)
        }
      }
      return results
    }
  }
}
