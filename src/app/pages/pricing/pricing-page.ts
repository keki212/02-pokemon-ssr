import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage implements OnInit { 
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page';
    // }

    // console.log(this.platform)

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Pricing page of our application' });
    this.meta.updateTag({ name: 'keywords', content: 'pricing, application, info' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'og:description', content: 'Learn more about our application pricing on this page.' });
  }
}