import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { AngularFireDatabase ,FirebaseListObservable} from 'angularfire2/database/';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$:FirebaseListObservable<ShoppingItem[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database:AngularFireDatabase,
    private actionSheeCtrl:ActionSheetController) {
    // Point shoppingListRef$ at Firebase -> 'shoping-list' node.  
    this.shoppingListRef$ = this.database.list('shopping-list');
    
    

  }

  selectShoppingItem(shoppingItem : ShoppingItem){
    this.actionSheeCtrl.create({
      title:`${shoppingItem.itemName}`,
      buttons:[
        {
          text:'Edit',
          handler : ()=>{
            // Send the user to the edit shoping item page and pass the paratmeter
            this.navCtrl.push(EditShoppingItemPage,{
              shoppingItemId:shoppingItem.$key
            });
          },
        },
        {
          text:'Delete',
          role:'destructive',
          handler: ()=>{
            // Delete the current shooping time.
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text:'Cancel',
          role:'cancel',
          handler: ()=>{
            console.log("user has selcted the cancel button");
          }
        }
      ]
    }).present();
  }

  navigateToAddShopingPage(){
    //Navigate the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }
}
