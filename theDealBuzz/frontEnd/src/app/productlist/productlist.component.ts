import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Products} from '../products';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(private _ProductService : ProductService) { }
  productList:Products[];
  province:string;
  ngOnInit(){
    this._ProductService.getProducts()
    .subscribe(
      data=>{
        //typecasting the data which is returned from the API
        this.productList=data;
      }
    )
  }
}
