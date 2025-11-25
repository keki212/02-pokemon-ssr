import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  let compiled: HTMLDivElement;

  @Component({ selector: 'app-navbar',
    imports:[RouterLink, RouterLinkActive],
    template: '' })
  class NabvarMock {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).overrideComponent(App,{
      add:{ imports: [NabvarMock ] },
      remove:{ imports: [Navbar] }
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLDivElement;
  });

  it('should create the app', () => {
    // console.log(compiled);
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app-navbar and router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
    expect(compiled.querySelector('app-navbar')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');
    const mustHaveClasses = 'max-w-3xl m-auto mt-16 px-2'.split(' ');

    expect(divElement).not.toBeNull();
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });
});
