import { ComponentFixture, TestBed } from '@angular/core/testing';
import ContactPage from './contact-page';
import { Meta, Title } from '@angular/platform-browser';


describe('ContactPage', () => {
  let fixture: ComponentFixture<ContactPage>;
  let compiled: HTMLElement;
  let component: ContactPage;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Obtenemos las instancias de los servicios
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);

  });

  it('should create the ContactPage', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    // Espiamos el método setTitle del servicio Title
    spyOn(titleService, 'setTitle').and.callThrough();
    
    // Ejecutamos ngOnInit manualmente
    component.ngOnInit();
    fixture.detectChanges();
    
    // Verificamos que se llamó con el título correcto
    expect(titleService.setTitle).toHaveBeenCalledWith('Contact us');
    
    // También podemos verificar el título directamente
    expect(titleService.getTitle()).toBe('Contact us');
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
      content: 'Contact page of our application' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'keywords', 
      content: 'contact, application, info' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:title', 
      content: 'Contact Page' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:description', 
      content: 'Get in touch with us through this page.' 
    });
  });

  it('should call ngOnInit automatically when component is created', () => {
    component.ngOnInit();
    fixture.detectChanges();
     expect(titleService.getTitle()).toBe('Contact us');
  });

  it('should render the template content', () => {
    fixture.detectChanges();
    
    // Verificamos que el contenido del template se renderiza
    // (asumiendo que about-page.html tiene algún contenido HTML)
    expect(compiled.innerHTML).toBeDefined();
    expect(compiled.innerHTML.length).toBeGreaterThan(0);
  });
});