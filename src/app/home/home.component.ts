import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
products!:any
  constructor(private product:ProductService){

  }

  ngOnInit():void{
    this.getAllProducts();
  }

  getAllProducts(){
    this.product.getAllProduct().subscribe((res:any)=>{
      this.products=res
    },err=>{
      console.log(err)
    })
  }
}
