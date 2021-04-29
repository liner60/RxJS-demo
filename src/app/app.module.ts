import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelTableStreamComponent } from './components/excel-table-stream/excel-table-stream.component';
import { FormsModule } from '@angular/forms';
import { ExcelTableComponent } from './components/excel-table/excel-table.component';
import { LuckyNumberComponent } from './components/lucky-number/lucky-number.component';
import { DemoDetailComponent } from './pages/demo-detail/demo-detail.page';
import { DemoOutlineComponent } from './pages/demo-outline/demo-outline.page';
import { HttpClientModule } from '@angular/common/http';
import { TestCaseComponent } from './components/test-case/test-case.component';

@NgModule({
  declarations: [
    AppComponent,
    ExcelTableComponent,
    ExcelTableStreamComponent,
    LuckyNumberComponent,
    DemoDetailComponent,
    DemoOutlineComponent,
    TestCaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
