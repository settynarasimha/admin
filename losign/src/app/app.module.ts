import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DocumentsComponent } from './documents/documents.component';
import { AppliedDocumentsComponent } from './applied-documents/applied-documents.component';
import { VerificationComponent } from './verification/verification.component';
import { CorrectiondocumentsComponent } from './correctiondocuments/correctiondocuments.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DocumentsComponent,
    AppliedDocumentsComponent,
    VerificationComponent,
    CorrectiondocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
