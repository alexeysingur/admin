export interface IUser {
  key?: string;
  surname: string;
  name: string;
  secName: string;
  sex: string;
  position: string;
  division: string;
  photo:string | ArrayBuffer;
  accesses:{
    createDepos:boolean;
    closeDepose:boolean;
    approveCred:boolean;
    approveCount:boolean;
  }
}
