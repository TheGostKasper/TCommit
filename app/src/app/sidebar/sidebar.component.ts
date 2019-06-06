import { Component, OnInit } from '@angular/core';

declare const $: any;

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'user', title: 'Users', icon: 'graphic_eq', class: '' },
  { path: 'hotel', title: 'Hotels', icon: 'search', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./../app.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  current_user = {name:''}
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
  isMobileMenu() {

    // if ($(window).width() > 991) {
    //   return false;
    // }
    // return true;
  };
}
