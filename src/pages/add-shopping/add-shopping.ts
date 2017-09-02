import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creating a new object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$:FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database:AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem : ShoppingItem){
    console.log(shoppingItem);
    // Create  a new object and add to firebase.
    this.shoppingItemRef$.push({
      itemName:this.shoppingItem.itemName,
      itemNumber:Number(this.shoppingItem.itemNumber)
    });

    // Rest the Shopping Item
    this.shoppingItem = {} as ShoppingItem;

    // Nav back to the shoppingListPage
    this.navCtrl.pop();
  }

}
