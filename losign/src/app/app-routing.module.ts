import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppliedDocumentsComponent } from './applied-documents/applied-documents.component';
import { VerificationComponent } from './verification/verification.component';
import { CorrectiondocumentsComponent } from './correctiondocuments/correctiondocuments.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'documents',component:DocumentsComponent},
  {path:'appliedDocuments',component:AppliedDocumentsComponent},
  {path:'verification',component:VerificationComponent},
  {path:'correctiondocuments',component:CorrectiondocumentsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
