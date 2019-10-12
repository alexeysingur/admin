import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { IUser } from '../model/iuser';
import { StreamsService } from '../services/streams.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  usersList: IUser[];
  data: IUser[];

  constructor(
    private fbs: FirebaseServiceService,
    private str: StreamsService
  ) {
    fbs.getData().subscribe(obs => {
      this.usersList = obs;
      this.data = obs;
    });
    str.searchStream$.subscribe(observer => {
      this.searchSurname(observer);
    });
  }

  onUpdate(user: IUser) {
    const a = user;
    this.str.stream$.next(a);
  }

  onDelete(key: string) {
    this.fbs.deleteFromFB(key);
  }

  searchSurname(request: string) {
    this.data = this.usersList.filter(item =>
      item.surname.includes(request.trim())
    );
  }

  searchDivision(request: string) {
    if (request === 'Отделение') {
      request = '';
    }
    this.data = this.usersList.filter(item =>
      item.division.includes(request.trim())
    );
  }

  searchPosition(request: string) {
    if (request === 'Должность') {
      request = '';
    }
    this.data = this.usersList.filter(item =>
      item.position.includes(request.trim())
    );
  }

  ngOnInit() {}
}
