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
  onGetParcels() {
    this.dbService.getParcels().subscribe((data: any) => {
      this.pomsDB = data;
    });
  }

  

  ngOnInit(): void {
  }

}
