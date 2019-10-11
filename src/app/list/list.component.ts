import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { IUser } from '../model/iuser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  usersList: IUser[];
  user: IUser = null;

  constructor(private fbs: FirebaseServiceService) {
    fbs.getData().subscribe(obs => {
      this.usersList = obs;
    });
  }

  onDelete(key: string) {
    this.fbs.deleteFromFB(key);
  }

  ngOnInit() {}
}
