import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() {
    console.log('Shopping cart funcionando');
  }
}
