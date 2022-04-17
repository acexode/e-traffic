import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Keyboard } from '@capacitor/keyboard';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchProduct') searchProduct: IonSearchbar;
  searchTerm$ = new Subject<string>();
  showSpinner;
  items = [];
  searchResult = null;
  constructor(public modalController: ModalController) {

  }

  ngAfterViewInit() {
    Keyboard.show();
    console.log(this.searchProduct);
   this.searchProduct.setFocus();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  onChange($event){
    console.log($event.target.value);
    const value = $event.target.value;
    if(value.length){
      this.searchTerm$.next($event.target.value);
      // call search service
    }
  }
}
