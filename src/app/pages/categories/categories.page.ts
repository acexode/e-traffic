/* eslint-disable no-underscore-dangle */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories =[];
  constructor(private _location: Location, private router: Router) { }

  ngOnInit() {
  }
  back(){
    this._location.back();
  }
  navigate(q){
    this.router.navigate(['menu/home/shop', {category: q}]);
  }
}
