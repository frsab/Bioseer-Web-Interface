import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = true;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Home',
      icon: 'fas fa-home',
      link: '/',
      active: false
    },
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'About Us',
      type: 'dropdown',
      icon: 'fa fa-question-circle',
      active: false,
      submenus: [
        {
          title: 'Our Team',
          link: '/team'
        },
        {
          title: 'Our Mission',
          link: '/mission'
        }
      ]
    },
    {
      title: 'The Technology',
      type: 'dropdown',
      icon: 'fas fa-tint',
      active: false,
      submenus: [
        {
          title: 'The Software',
          link: '/software'
        },
        {
          title: 'The Hardware',
          link: '/hardware'
        }
      ]
    },
    {
      title: 'Dashboard',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      link: '/dashboard',
      active: false,
      // badge: {
      //   text: 'New ',
      //   class: 'badge-warning'
      // },
    },
    {
      title: 'Upload Image',
      icon: 'fas fa-cloud-upload-alt',
      link: '/upload-images',
      active: false,
      auth: true
    },
    {
      title: 'Account',
      auth: true
    },
    {
      title: 'Edit Account',
      icon: 'fas fa-edit',
      link: '/edit-account',
      active: false,
      auth: true
    },
    // {
    //   title: 'E-commerce',
    //   icon: 'fa fa-shopping-cart',
    //   active: false,
    //   type: 'dropdown',
    //   badge: {
    //     text: '3',
    //     class: 'badge-danger'
    //   },
    //   submenus: [
    //     {
    //       title: 'Products',
    //     },
    //     {
    //       title: 'Orders'
    //     },
    //     {
    //       title: 'Credit cart'
    //     }
    //   ]
    // },
    // {
    //   title: 'Components',
    //   icon: 'far fa-gem',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'General',
    //     },
    //     {
    //       title: 'Panels'
    //     },
    //     {
    //       title: 'Tables'
    //     },
    //     {
    //       title: 'Icons'
    //     },
    //     {
    //       title: 'Forms'
    //     }
    //   ]
    // },
    // {
    //   title: 'Charts',
    //   icon: 'fa fa-chart-line',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Pie chart',
    //     },
    //     {
    //       title: 'Line chart'
    //     },
    //     {
    //       title: 'Bar chart'
    //     },
    //     {
    //       title: 'Histogram'
    //     }
    //   ]
    // },
    // {
    //   title: 'Maps',
    //   icon: 'fa fa-globe',
    //   active: false,
    //   type: 'dropdown',
    //   submenus: [
    //     {
    //       title: 'Google maps',
    //     },
    //     {
    //       title: 'Open street map'
    //     }
    //   ]
    // },
    // {
    //   title: 'Extra',
    //   type: 'header'
    // },
    // {
    //   title: 'Documentation',
    //   icon: 'fa fa-book',
    //   active: false,
    //   type: 'simple',
    //   badge: {
    //     text: 'Beta',
    //     class: 'badge-primary'
    //   },
    // },
    // {
    //   title: 'Calendar',
    //   icon: 'fa fa-calendar',
    //   active: false,
    //   type: 'simple'
    // },
    // {
    //   title: 'Examples',
    //   icon: 'fa fa-folder',
    //   active: false,
    //   type: 'simple'
    // }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}

