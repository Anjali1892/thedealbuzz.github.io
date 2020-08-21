import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {ProductService} from '../product.service';

declare var M:any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProductService]
})
export class CreateComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?:NgForm){
    if(form){
      form.reset();
    }
    this.productService.selectedProduct={
      _id:"",
      price:null,
      locality:"",
      city:"",
      province:"",
      postalCode:"",
      buildingType:"",
      description:""
    }
  }
  onSubmit(form: NgForm){
    this.productService.createProduct(form.value)
    .subscribe((res)=>{
      this.resetForm(form);
      M.toast({html:'Saved Successfully', classes:'rounded'});
    });
  }
}
