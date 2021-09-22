import { AppdataState, DataStateEnum } from "../../state/product.state"
import { Component, OnInit } from '@angular/core';
import { catchError, map, startWith } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // first way
  //products?: Product[] ;

  //second way
  products$?:Observable<AppdataState<Product[]>>;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
  }

  // first way
  // onGetAllProducts() {
  //   this.productService.getAllProducts().subscribe(data => {
  //       this.products = data;
  //   });
  // }

  //second way

  //get all products
  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts()
    .pipe(
      map(data => ({dataState:DataStateEnum.LOADED,data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
    }
    
  //get selected products
  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts()
      .pipe(
        map(data => ({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  //get available products
  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts()
      .pipe(
        map(data => ({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  //search product with his name
  onSearch(dataForm:any) {
    this.products$ = this.productService.searchProduct(dataForm.keyword)
      .pipe(
        map(data => ({dataState:DataStateEnum.LOADED,data:data})),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err => of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  //select Product
  onSelect(product: Product) {
     
  }


}
