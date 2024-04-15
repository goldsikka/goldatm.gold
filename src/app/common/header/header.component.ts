import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hideScrollTopButton(): void {
    const scrollTopButton = document.querySelector('.scroll-top-btn');
    if (scrollTopButton) {
      scrollTopButton.classList.add('scroll-top-btn-hidden');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTopButton = document.querySelector('.scroll-top-btn');
    
    if (scrollTopButton) {
      if (window.scrollY > 300) { // Adjust this value as needed
        scrollTopButton.classList.remove('scroll-top-btn-hidden');
      } else {
        scrollTopButton.classList.add('scroll-top-btn-hidden');
      }
    }
    const position = document.querySelector('.navbar');
    if (position) {
      if (window.scrollY > 30) { // Adjust this value as needed
        position.classList.add('nav-position');
      } else {
        position.classList.remove('nav-position');
      }
    }
  }
}
