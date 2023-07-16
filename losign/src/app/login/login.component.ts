import { Component } from '@angular/core';
import { Logclass } from '../logclass';
import { LogserviceService } from '../logservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private logservice:LogserviceService){}
  logo:Logclass=new Logclass();
  logControl(){
      console.log(this.logo);
      this.logservice.loginUser(this.logo).subscribe(data=>{
        alert("Login Successfully")
      },error=>alert("Sorry please Enter Correct Details"));
  }


}
