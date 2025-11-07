import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type Product = { id:string; name:string; blurb:string; imageUrl:string; tag?:string };

@Component({
  selector: 'app-home.page',
  imports: [CommonModule],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.css'
})
export class HomePageComponent {
  brand = 'Saveurs du Mexique'; 
  heroImage = 'assets/images/dulces.png';

  products: Product[] = [
    { id:'pelon',     name:'Pelon Pelo Rico', blurb:'Tamarind candy with chili', imageUrl:'assets/images/products/pelon.png', tag:'Tamarind' },
    { id:'bubulubu',  name:'Bubulubu',  blurb:'Marshmallow & chocolate', imageUrl:'assets/images/products/bubulubu.png',  tag:'Classic' },
    { id:'diablitos', name:'Diablitos', blurb:'Spicy lollipops',         imageUrl:'assets/images/products/diablitos.png' },
    { id:'diablo',    name:'Diablo',    blurb:'Hot & sweet',             imageUrl:'assets/images/products/diablo.png',    tag:'Spicy' },
    { id:'doritos',   name:'Doritos',   blurb:'Mexican flavors',         imageUrl:'assets/images/products/doritos.png' },
    { id:'peloneta',  name:'Peloneta',  blurb:'Tamarind pop',            imageUrl:'assets/images/products/peloneta.png' },
  ];
}