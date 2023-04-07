import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CardProjectComponent } from './component/card-project/card-project.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    CardProjectComponent
  ],
  exports: [
    MatCardModule,
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
