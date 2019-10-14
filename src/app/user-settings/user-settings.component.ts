import {
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { IUser } from '../model/iuser';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { StreamsService } from '../services/streams.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.sass']
})
export class UserSettingsComponent implements OnInit, OnChanges {
  user: IUser;
  updateUser = false;

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
        this.user.photo = observer.photo;
        this.user.accesses.createDepos=observer.accesses.createDepos;
        this.user.accesses.closeDepose=observer.accesses.closeDepose;
        this.user.accesses.approveCred=observer.accesses.approveCred;
        this.user.accesses.approveCount=observer.accesses.approveCount;

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

  onPushPhoto(event:any){
    const img = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload=()=>{
      this.user.photo = reader.result
      event.target.value =''
    }
    
    reader.readAsDataURL(img);
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
      division: '',
      photo:'',
      accesses:{
        createDepos:false,
        closeDepose:false,
        approveCred:false,
        approveCount:false,
      }
    };
  }

  ngOnChanges(): void {
    if (!this.user) {
      this.userReset();
    }
  }

  ngOnInit(){
    this.userReset();
  }
}
