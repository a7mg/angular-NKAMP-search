import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IAppConfig } from "../dataModels/IAppConfig";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AppConfigService {
  // ---------------------------------------------------------------------------------------------------------------------------------- //

  //#region attributes

  private settings: any;
  private _componentName: string;
  private _language: string;
  private _deployUrl: string;
  private _isLoaded: boolean;
  configdata: IAppConfig;
  nameurl: string = "";

  //#endregion attributes

  // ---------------------------------------------------------------------------------------------------------------------------------- //
  constructor(private _httpClient: HttpClient, private router: Router) {
    this._componentName = "NA";
    this._language = "NA";
    this._deployUrl = "NA";
    this._isLoaded = false;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  readConfigFile(): Promise<any> {
    const jsonFile = `${this._deployUrl.toLowerCase()}assets/Configuration/AppConfig.txt`;
    return this._httpClient.get(jsonFile).toPromise();
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  async load(): Promise<void> {
    await this.readConfigFile()
      .then((response: any) => {
        this.settings = response;
        this.ReadConfig();
      })
      .catch(error => {
        console.log(error);
      });
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //

  //#region Properties Implementation

  // ---------------------------------------------------------------------------------------------------------------------------------- //
  get isLoaded(): boolean {
    return this._isLoaded;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  set deployUrl(dUrl: string) {
    this._deployUrl = dUrl;
  }
  get deployUrl(): string {
    return this._deployUrl;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  set componentName(compName: string) {
    this._componentName = compName;
  }
  get componentName(): string {
    return this._componentName;
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  set language(lang: string) {
    this._language = lang;
  }
  get language(): string {
    return this._language;
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------//

  //#endregion

  // ---------------------------------------------------------------------------------------------------------------------------------- //
  ReadConfig(url: string = "") {
    this.configdata = <IAppConfig>{};
    try {
      //TODO merge dataSourceController with platform.
      this.configdata.apiUrl = this.settings.Common.apiUrl;
      this.configdata.dataSourceController = this.settings.Common.dataSourceController;
      this.configdata.navigationMode = this.settings.Common.navigationMode;
      this.configdata.customSettings = this.settings.Common.customSettings;
      this.configdata.platform = this.settings.Common.platform;

      if (this.configdata.navigationMode === NavigationMode.free) {
        for (var key in this.settings.CustomSettings) {
          if (
            ("/" + key.toLowerCase().toLowerCase()).indexOf(
              url.toLowerCase()
            ) >= 0
          ) {
            this.componentName = key;
            this.configdata.componentSettings = this.settings.CustomSettings[
              this.componentName
            ];
          }
        }
      } else {
        this.configdata.componentSettings = this.settings.CustomSettings[
          this.componentName
        ];
      }

      this._isLoaded = true;
    } catch (error) {
      this._isLoaded = false;
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
}
//// ------------------------------------------------------------------------------------------------------------------------------------------------------- ////
//// the following RouteGuard is used to check if the AppConfigService is loaded and redirect to the desired component, designated in the <app-root></app-root> tag ////
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { NavigationMode } from "../dataModels/enums";

@Injectable({
  providedIn: "root"
})
export class NavigationRouteGuard implements CanActivate {
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  constructor(private appConfig: AppConfigService) {}
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.appConfig.isLoaded) {
      return this.checkCurrentPath(state);
    } else {
      setTimeout(() => {
        return this.checkCurrentPath(state);
      }, 1000);
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
  checkCurrentPath(stateSnapshot: RouterStateSnapshot): boolean {
    if (this.appConfig.configdata.navigationMode === NavigationMode.fixed) {
      var componentNameInRoutingTable = this.appConfig.componentName.toLowerCase();
      componentNameInRoutingTable = componentNameInRoutingTable.split("_")[0];
      if (
        stateSnapshot.url.toLowerCase().indexOf(componentNameInRoutingTable) >=
        0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      this.appConfig.ReadConfig(stateSnapshot.url.toLowerCase());
      return true;
    }
  }
  // ---------------------------------------------------------------------------------------------------------------------------------- //
}