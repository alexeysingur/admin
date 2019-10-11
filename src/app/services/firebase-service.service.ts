import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { IUser } from '../model/iuser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  people: IUser[];
  peopleDB: any;
  vari: any;

  constructor(public db: AngularFireDatabase) {
    this.peopleDB = db.list('people');
  }

  getData() {
    return this.peopleDB
      .snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  pushToFB(data: IUser) {
    this.peopleDB.push(data);
  }

  updateToFB(data: IUser) {
    this.peopleDB.update(data.key, data);
  }

  deleteFromFB(key: string) {
    this.peopleDB.remove(key);
  }
}
