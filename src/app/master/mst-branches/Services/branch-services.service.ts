import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BranchClass } from '../Classes/branch-class';

@Injectable({
  providedIn: 'root'
})
export class BranchServicesService {

  readonly BaseURI = 'http://localhost:54628/api';
  form: BranchClass;
  constructor(public http: HttpClient) { }

  GetLoadGridDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadGrids');
  }

  GetLoadPettyCashDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadPettyCash');
  }

  GetLoadSalaryCashDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadSalaryCash');
  }

  GetLoadAdvanceCashDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadAdvanceCash');
  }

  GetLoadCashInHndDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadCashInHand');
  }

  GetBankAccountDD() {
    return this.http.get(this.BaseURI + '/Branches/LoadBankAccount');
  }

  InsertBranch() {
    return this.http.post(this.BaseURI + '/Branches/InsertBranch', this.form);
  }

  GetBranchData() {
    return this.http.get(this.BaseURI + '/Branches/GetBranchData');
  }

  UppdateBranch() {
    return this.http.post(this.BaseURI + '/Branches/UpdateBranch', this.form);
  }

  LoadAllDDData(){
    return this.http.get(this.BaseURI+'/Branches/LoadAllDDData');
  }
}
