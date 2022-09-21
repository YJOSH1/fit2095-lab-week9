import { Component, OnInit } from '@angular/core';
import { AnyArray } from 'mongoose';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-poms',
  templateUrl: './poms.component.html',
  styleUrls: ['./poms.component.css']
})
export class PomsComponent implements OnInit {
  pomsDB: any[] = [];

  section = 1;

  senderName: string = "";
  
  senderId: string = "";
  address: string = "";
  weight: number = 0;
  fragile: boolean = false;

  constructor(private dbService: DatabaseService) {}

  //get all parcels
  onAddParcel() {
    let newParcel = {
      senderId: this.senderId,
      parcel: {
        weight: this.weight,
        address: this.address,
        fragile: this.fragile
      }
    }

    this.dbService.addParcel(newParcel).subscribe(result => {
      this.changeSection(4);
    });
  }

  onAddSender() {
    let newSender = {
      name: this.senderName
    }

    this.dbService.addSender(newSender).subscribe(result => {
      this.changeSection(3);
    })
  }

  onGetParcels() {
    this.dbService.getParcels().subscribe((data: any) => {
      this.pomsDB = data;
    });
  }

  onGetSenders() {
    this.dbService.getSenders().subscribe((data: any) => {
      this.pomsDB = data;
    });
  }

  ngOnInit(): void {
  }

  changeSection(sectionId: number) {
    this.section = sectionId;
    this.resetValues();
    
    if (sectionId == 4) {
      this.onGetParcels();
    } else if (sectionId == 5) {
      this.onGetSenders();
    }
  }

  resetValues() {
    this.senderName = "";
    this.senderId = "";
    this.address = "";
    this.weight = 0;
    this.fragile = false;
  }

}
