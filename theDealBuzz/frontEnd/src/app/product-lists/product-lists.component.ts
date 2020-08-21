import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {

  Product:any=[];

  constructor(private ProductService: ProductService) {
    this.readProduct();
   }

  ngOnInit(): void {}
  readProduct(){
    this.ProductService.getListings().subscribe((data)=>{
      this.Product=data;
    })
  }
  removeProduct(product,index){
    if(window.confirm('Are you sure you want to delete this Listing?')){
      this.ProductService.deleteProduct(product._id).subscribe((data)=>{
        this.Product.splice(index,1);
      })
    }
  }
}
