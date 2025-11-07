import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ValueCard = {
  title: string;
  copy: string;
  img: string;
  blobClass: 'blob-1' | 'blob-2' | 'blob-3';
};

@Component({
  selector: 'app-about.page',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.page.component.html',
  styleUrl: './about.page.component.css'
})
export class AboutPageComponent {
  readonly heroImg = 'assets/images/about/group0.png';

  readonly values: ValueCard[] = [
    {
      title: 'Community',
      copy: 'We celebrate diversity and bring people together through flavor.',
      img: 'assets/images/about/group2.png',
      blobClass: 'blob-2',
    },
    {
      title: 'Tradition',
      copy: 'We honor recipes and techniques passed down for generations.',
      img: 'assets/images/about/group3.png',
      blobClass: 'blob-3',
    },
    {
      title: 'Quality',
      copy: 'Curated, small-batch products with transparent origins.',
      img: 'assets/images/about/group1.png',
      blobClass: 'blob-1',
    },
  ];

  trackByTitle = (_: number, v: ValueCard) => v.title;
}
