import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';



declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'user', title: 'Users', icon: 'graphic_eq', class: '' },
  { path: 'hotel', title: 'Hotels', icon: 'search', class: '' },
  { path: 'reservations', title: 'Reservations', icon: 'search', class: '' },
];
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./../app.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  current_user = {}
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES;
    ROUTES.filter(menuItem => menuItem);
    this.current_user = JSON.parse(localStorage.getItem('current_user'));
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    window.location.href = '';
  }
  setBck(event){
    $('a.nav-link.menu-item').css('background','#f8f9fa');
    $('a.nav-link.menu-item').css('color','black');
    $(event).css('background','#a75a61');
    $(event).css('color','white');
  }


}
