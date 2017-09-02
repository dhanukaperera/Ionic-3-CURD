import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database/';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$:FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database:AngularFireDatabase) {
    // Point shoppingListRef$ at Firebase -> 'shoping-list' node.  
    this.shoppingListRef$ = this.database.list('shopping-list');
    
  }

  navigateToAddShopingPage(){
    //Navigate the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }
}
