import { Component } from '@angular/core';
import { Signclass } from '../signclass';
import { SignserviceService } from '../signservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private logservice:SignserviceService){}
  sign:Signclass=new Signclass();
  signControl(){
    console.log(this.sign);
    this.logservice.loginUser(this.sign).subscribe(data=>{
      alert("signin Successfully")
    },error=>alert("invalid"));
}
  }


