import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: any [] = [];
  constructor() {
    console.log('Shopping cart funcionando');
  }


}
