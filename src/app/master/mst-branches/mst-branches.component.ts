import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchServicesService } from './Services/branch-services.service';

@Component({
  selector: 'app-mst-branches',
  templateUrl: './mst-branches.component.html',
  styleUrls: ['./mst-branches.component.css']
})
export class MstBranchesComponent implements OnInit {

  constructor(public mainSer: BranchServicesService, public toastr: ToastrService) { }
  //List
  gridDD: any;
  salaryDDres: any;
  pettyRes: any;
  advRes: any;
  cashInHnd: any;
  bankAccountDD: any;
  BranchData: any;
  LoadAllDataLst: any;
  //fileter List
  salaryDDresFil: any;
  pettyResFil: any;
  advResFil: any;
  cashInHndFil: any;
  bankAccountDDFil: any;
  gridDDFill: any;
  LoadAllDataLstFil: any;
  //vars
  brVal: string;
  btnSve: boolean;

  ngOnInit(): void {
    this.GetLoadGridDD();
    this.LoadAllDDData();
    this.Reset();
  }

  GetLoadGridDD() {
    this.mainSer.GetLoadGridDD().subscribe((res: any) => {
      if (res != null) {
        this.gridDD = res;
      }
    },
      err => { console.error(); });
  }

  GetLoadPettyCashDD() {
    this.mainSer.GetLoadPettyCashDD().subscribe((res: any) => {
      if (res != null) {
        //petty
        this.pettyRes = res.filter(x => x.AccntntCod == 'Petty');
        this.pettyResFil = res.filter(x => x.AccntntCod == 'Petty');

        //this.GetLoadSalaryCashDD();
      }
    },
      err => { console.error(); });
  }

  GetLoadSalaryCashDD() {
    this.mainSer.GetLoadSalaryCashDD().subscribe((res: any) => {
      if (res != null) {
        this.salaryDDres = res;
        this.salaryDDresFil = res;
        this.GetLoadAdvanceCashDD();
      }
    },
      err => { console.error(); });
  }

  GetLoadAdvanceCashDD() {
    this.mainSer.GetLoadAdvanceCashDD().subscribe((res: any) => {
      if (res != null) {
        this.advRes = res;
        this.advResFil = res;
        this.GetLoadCashInHandDD();
      }
    },
      err => { console.error(); });
  }

  GetLoadCashInHandDD() {
    this.mainSer.GetLoadCashInHndDD().subscribe((res: any) => {
      if (res != null) {
        this.cashInHnd = res;
        this.cashInHndFil = res;
        this.GetBankAccountDD();
      }
    },
      err => { console.error(); });
  }

  GetBankAccountDD() {
    this.mainSer.GetBankAccountDD().subscribe((res: any) => {
      if (res != null) {
        this.bankAccountDD = res;
        this.bankAccountDDFil = res;
      }
    },
      err => { console.error(); });
  }

  Reset(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.mainSer.form = {
      brnchId: "",
      name: "",
      advDD: "",
      loadGrdDD: "",
      cshInhndDD: "",
      pettyDD: "",
      salDD: "",
      baDD: ""
    }
    this.btnSve = true;
    this.GetBranchData();
  }

  BranchChange(v) {
    this.advRes = this.advResFil;
    this.salaryDDres = this.salaryDDresFil;
    this.cashInHnd = this.cashInHndFil;
    this.pettyRes = this.pettyResFil;
    this.brVal = v.target.value.split(":");
    this.mainSer.form.brnchId = this.brVal[1].trim();
    this.mainSer.form.name = "";
    this.advRes = this.advRes.filter(x => x.exportCode == this.mainSer.form.brnchId);
    this.salaryDDres = this.salaryDDres.filter(x => x.exportCode == this.mainSer.form.brnchId);
    this.cashInHnd = this.cashInHnd.filter(x => x.exportCode == this.mainSer.form.brnchId);
    this.pettyRes = this.pettyRes.filter(x => x.exportCode == this.mainSer.form.brnchId);
  }

  Submit() {
    this.mainSer.InsertBranch().subscribe((res: any) => {
      if (res > 0) {
        this.toastr.success("Success");
      }
    }, err => {
      this.toastr.error("Failed");
      console.error();

    });
  }

  GetBranchData() {
    this.mainSer.GetBranchData().subscribe((res: any) => {
      if (res != null) {
        this.BranchData = res;
      }
    },
      err => {
        console.error();
      });
  }

  Update() {
    this.mainSer.UppdateBranch().subscribe((res: any) => {
      if (res > 0) {
        this.toastr.success("Success");
        this.Reset();
      }
    }, err => {
      this.toastr.error("Failed");
      console.error();

    });
  }

  Edit(reqObj) {
    this.btnSve = false;
    this.mainSer.form = {
      brnchId: reqObj["brnchId"],
      name: "",
      advDD: reqObj["advDD"],
      loadGrdDD: reqObj["loadGrdDD"],
      cshInhndDD: reqObj["cshInhndDD"],
      pettyDD: reqObj["pettyDD"],
      salDD: reqObj["salDD"],
      baDD: reqObj["baDD"]
    }
  }

  LoadAllDDData() {
    this.mainSer.LoadAllDDData().subscribe((res) => {
      if (res != null && res != undefined) {
        this.LoadAllDataLst = res;
        this.LoadAllDataLstFil = res;
        this.AssignDataToLsts();
      }
    });
  }

  AssignDataToLsts() {
    //petty
    this.pettyRes = this.LoadAllDataLst.filter(x => x.accntntCod == 'Petty');
    this.pettyResFil = this.LoadAllDataLst.filter(x => x.accntntCod == 'Petty');
    //bank Account
    this.bankAccountDD = this.LoadAllDataLst.filter(x => x.accntntCod == 'Bank');
    this.bankAccountDDFil = this.LoadAllDataLst.filter(x => x.accntntCod == 'Bank');
    //Cash In Hand
    this.cashInHnd = this.LoadAllDataLst.filter(x => x.accntntCod == 'Cash');
    this.cashInHndFil = this.LoadAllDataLst.filter(x => x.accntntCod == 'Cash');
    //Salary
    this.salaryDDres = this.LoadAllDataLst.filter(x => x.acName.includes('Salaries Payable'));
    this.salaryDDresFil = this.LoadAllDataLst.filter(x => x.acName.includes('Salaries Payable'));
    //Advnce Cash
    this.advResFil = this.LoadAllDataLst.filter(x => x.acName.includes('Advances to Employees'));
    this.advRes = this.LoadAllDataLst.filter(x => x.acName.includes('Advances to Employees'));
  }

}