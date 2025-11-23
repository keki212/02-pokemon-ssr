import { Meta, Title } from '@angular/platform-browser';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  imports: [],
  templateUrl: './contact-page.html',
})
export default class ContactPage implements OnInit { 
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact us');
    this.meta.updateTag({ name: 'description', content: 'Contact page of our application' });
    this.meta.updateTag({ name: 'keywords', content: 'contact, application, info' });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({ name: 'og:description', content: 'Get in touch with us through this page.' });
  }
}