// ------------------------------------------------------------------------------------------------------------ //
// ----------------- Angular Modules -------------------------------------------------------------------------- //
import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { JsonpModule } from '@angular/http';
// ------------------------------------------------------------------------------------------------------------ //
// ----------------- Angular Modules -------------------------------------------------------------------------- //
import {
  ProgressSpinnerModule,
  BlockUIModule,
  PanelModule,
  SharedModule
} from "primeng/primeng";
import { MessagesModule } from "primeng/messages";
import { UrlSerializer } from "@angular/router";
import { LowerCaseUrlSerializer } from "./services/lowercase-url-deserializer";
import { ErrorHandlingModule } from "../Naseej-error-handling/error-handling.module";
// ------------------------------------------------------------------------------------------------------------ //
export const providers = [
  {
    provide: UrlSerializer,
    useClass: LowerCaseUrlSerializer
  }
];
// ------------------------------------------------------------------------------------------------------------ //
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    JsonpModule,
    ProgressSpinnerModule,
    MessagesModule,
    BlockUIModule,
    PanelModule,
    SharedModule,
    ErrorHandlingModule
  ],

  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    JsonpModule,
    ProgressSpinnerModule,
    MessagesModule,
    BlockUIModule,
    PanelModule,
    SharedModule,
    ErrorHandlingModule
  ]
})
export class NaseejSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NaseejSharedModule,
      providers: [providers]
    };
  }
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NaseejSharedModule
  ) {
    if (parentModule) {
      console.log("NaseejSharedModule is already loaded");
    }
  }
}
// ------------------------------------------------------------------------------------------------------------ //
