import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../model/iuser';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit {
  user: IUser;

  constructor(private fbs: FirebaseServiceService) {
    this.userReset();
  }

  onSubmit() {
    !this.user.key ? this.fbs.pushToFB(this.user) : this.fbs;
    this.userReset();
  }

  onReset() {
    this.userReset();
  }

  userReset() {
    this.user = {
      name: '',
      surname: '',
      secName: '',
      sex: '',
      position: '',
      division: ''
    };
  }

  ngOnInit() {}
}
