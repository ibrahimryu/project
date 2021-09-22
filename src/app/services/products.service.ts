import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../model/product.model";

@Injectable({providedIn:"root"})
export class ProductsService {
    constructor(private http: HttpClient) {}

    getAllProducts():Observable<Product[]>{
        return this.http.get<Product[]>(environment.host + "/products");
    }

    getSelectedProducts():Observable<Product[]> {
        return this.http.get<Product[]>(environment.host + "/products?selected=true");
    }

    getAvailableProducts():Observable<Product[]> {
        return this.http.get<Product[]>(environment.host + "/products?available=true");
    }

    searchProduct(keyword:string):Observable<Product[]> {
        return this.http.get<Product[]>(environment.host + "/products?name_like=" + keyword);
    }

    selectProduct(p: Product):Observable<Product[]> {
        p.selected = !p.selected;
        return this.http.put<Product[]>(environment.host + "/products/" + p.id, p);
    }
}