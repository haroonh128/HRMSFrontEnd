import { Injectable } from '@angular/core';
import { AssgnClass } from '../Classes/assgn-class';

@Injectable({
  providedIn: 'root'
})
export class AssgnServiceService {
  form: AssgnClass;
  constructor() { }

}
