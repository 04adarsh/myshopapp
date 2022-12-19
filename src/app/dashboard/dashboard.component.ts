import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';


// interface Product{
//   id:number,
//   productName:string,
//   productDescription:string,
//   productPrice:number,
//   productUrl:string
// }


export class Product{
  id!:number
  productName!:string
  productDescription!:string
  productPrice!:number
  productUrl!:string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  product!:Product;

  isAdd!:any;
  isUpdate!:any;
  formValue!:FormGroup;
  products!:any;
 
  constructor(private formBuilder:FormBuilder,private productService:ProductService) {
    
  }

  onAdd(){
    this.formValue.reset();
    this.isAdd=true;
    this.isUpdate=false;
  }



  ngOnInit():void{
    this.formValue=this.formBuilder.group({
      productName:['',Validators.required],
      productDescription:['',Validators.required],
      productPrice:['',Validators.required],
      productUrl:['',Validators.required]
    })

    this.getAllProducts();
  }

  addProduct(){
    // this.product.id=this.formValue.value.id;
    // this.product.productName=this.formValue.value.productName;
    // this.product.productDescription=this.formValue.value.productDescription;
    // this.product.productPrice=this.formValue.value.productPrice;
    // this.product.productUrl=this.formValue.value.productUrl;
    this.product=this.formValue.value;
    this.productService.addProduct(this.product).subscribe((res:any)=>{
      alert("product added successfully..");
      this.getAllProducts();
      let ref=document.getElementById('close');
      ref?.click();
    },err=>{
      console.log(err)
    })
  }

getAllProducts(){
  this.productService.getAllProduct().subscribe((res:any)=>{
    this.products=res;
    console.log(res)
  },err=>{
    console.log(err);
  })
}

deleteProduct(row:any){
  this.productService.deleteProductById(row.id).subscribe((res:any)=>{
    alert("product deleted succsessfully...")
    this.getAllProducts();
  },err=>{
    console.log(err)
  })
}
onEdit(row:any){
  this.isAdd=false;
    this.isUpdate=true;
    this.product=new Product();
    this.product.id=row.id;
  this.f['productName'].setValue(row.productName);
  this.f['productDescription'].setValue(row.productDescription);
  this.f['productPrice'].setValue(row.productPrice);
  this.f['productUrl'].setValue(row.productUrl);
}

get f(){
  return this.formValue.controls;
}

updateProduct(){
  
  this.product.productName=this.formValue.value.productName;
  this.product.productDescription=this.formValue.value.productDescription;
  this.product.productPrice=this.formValue.value.productPrice;
  this.product.productUrl=this.formValue.value.productUrl;
  
  this.productService.updateProduct(this.product.id,this.product).subscribe((res:any)=>{
    alert("product updated successfully...")
      let ref=document.getElementById('close');
      ref?.click();
      this.getAllProducts();
  },err=>{
    console.log(err)
  })

}
}
