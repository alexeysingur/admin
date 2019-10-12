import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { IUser } from '../model/iuser';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { StreamsService } from '../services/streams.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit {
  user: IUser;
  updateUser: boolean = false;

  constructor(
    private fbs: FirebaseServiceService,
    private str: StreamsService
  ) {
    str.stream$.subscribe(observer => {
      if (observer) {
        this.user.name = observer.name;
        this.user.surname = observer.surname;
        this.user.secName = observer.secName;
        this.user.position = observer.position;
        this.user.division = observer.division;
        this.user.sex = observer.sex;
        this.user.key = observer.key;

        this.updateUser = true;
      }
    });
  }

  onSubmit() {
    if (!this.updateUser) {
      this.fbs.pushToFB(this.user);
    } else {
      this.updateUser = !this.updateUser;
      this.fbs.updateToFB(this.user);
    }
    this.userReset();
  }

  onReset() {
    if (this.updateUser) {
      this.updateUser = !this.updateUser;
    }
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

  ngOnChanges(): void {
    if (!this.user) {
      this.userReset();
    }
    console.log('hook');
  }

  ngOnInit() {
    this.userReset();
  }
}
