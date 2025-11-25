import { ComponentFixture, TestBed } from '@angular/core/testing';
import PricingPage from './pricing-page';
import { Meta, Title } from '@angular/platform-browser';


describe('PricingPage', () => {
  let fixture: ComponentFixture<PricingPage>;
  let compiled: HTMLElement;
  let component: PricingPage;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PricingPage);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Obtenemos las instancias de los servicios
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);

  });

  it('should create the PricingPage', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    // Espiamos el método setTitle del servicio Title
    spyOn(titleService, 'setTitle').and.callThrough();
    
    // Ejecutamos ngOnInit manualmente
    component.ngOnInit();
    fixture.detectChanges();
    
    // Verificamos que se llamó con el título correcto
    expect(titleService.setTitle).toHaveBeenCalledWith('Pricing Page');
    
    // También podemos verificar el título directamente
    expect(titleService.getTitle()).toBe('Pricing Page');
  });

   it('should update meta tags on initialization', () => {
    // Espiamos el método updateTag del servicio Meta
    spyOn(metaService, 'updateTag').and.callThrough();
    
    // Ejecutamos ngOnInit
    component.ngOnInit();
    fixture.detectChanges();
    
    // Verificamos que se llamó updateTag 4 veces (para cada meta tag)
    expect(metaService.updateTag).toHaveBeenCalledTimes(8);
    
    // Verificamos cada llamada específica
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'description', 
      content: 'Pricing page of our application' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'keywords', 
      content: 'pricing, application, info' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:title', 
      content: 'Pricing Page' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:description', 
      content: 'Learn more about our application pricing on this page.' 
    });
  });


});