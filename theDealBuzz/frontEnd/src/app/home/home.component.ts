import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Products} from '../products';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductService : ProductService) { }
  productList:Products[];
  city:string;
  ngOnInit(){
    this._ProductService.getProducts()
    .subscribe(
      data=>{
        //typecasting the data which is returned from the API
        this.productList=data;
      }
    )
  }

//   mySlideImages = ['../assets/images/image_1.jpg','../assets/images/about.jpg','../assets/images/image_3.jpg'];
// myCarouselImages =['../assets/images/image_1.jpg','../assets/images/about.jpg','../assets/images/image_3.jpg'];

// mySlideOptions={items: 1, dots: true, nav: true};
// myCarouselOptions={items: 3, dots: true, nav: true};
}
