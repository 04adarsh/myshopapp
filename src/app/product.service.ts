
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  addProduct(product:any){
    return this.http.post("http://localhost:3000/products",product);
  }

  getAllProduct(){
    return this.http.get("http://localhost:3000/products");
  }

  getProductById(id:any){
    return this.http.get("http://localhost:3000/products/"+id);
  }

  deleteProductById(productId:any){
    return this.http.delete("http://localhost:3000/products/"+productId);
  }

  updateProduct(id:any,data:any){
    return this.http.put("http://localhost:3000/products/"+id,data);
  }
  
}


