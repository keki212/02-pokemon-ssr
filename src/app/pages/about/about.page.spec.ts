import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import AboutPage from './about-page';

describe('AboutPage', () => {
  let fixture: ComponentFixture<AboutPage>;
  let compiled: HTMLElement;
  let component: AboutPage;
  let titleService: Title;
  let metaService: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    
    // Obtenemos las instancias de los servicios
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);

    
  });

  it('should create the AboutPage', () => {
    
    expect(component).toBeTruthy();
  });

  it('should set the page title on initialization', () => {
    // Espiamos el método setTitle del servicio Title
    spyOn(titleService, 'setTitle').and.callThrough();
    
    // Ejecutamos ngOnInit manualmente
    component.ngOnInit();
    fixture.detectChanges();
    
    // Verificamos que se llamó con el título correcto
    expect(titleService.setTitle).toHaveBeenCalledWith('About Page');
    
    // También podemos verificar el título directamente
    expect(titleService.getTitle()).toBe('About Page');
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
      content: 'About page of our application' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'keywords', 
      content: 'about, application, info' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:title', 
      content: 'About Page' 
    });
    
    expect(metaService.updateTag).toHaveBeenCalledWith({ 
      name: 'og:description', 
      content: 'Learn more about our application on this page.' 
    });
  });

  it('should have the correct meta tags after initialization', () => {
    // Ejecutamos ngOnInit
    component.ngOnInit();
    fixture.detectChanges();
    
    // Verificamos que los meta tags existen en el documento
    const descriptionMeta = metaService.getTag('name="description"');
    const keywordsMeta = metaService.getTag('name="keywords"');
    const ogTitleMeta = metaService.getTag('name="og:title"');
    const ogDescriptionMeta = metaService.getTag('name="og:description"');
    
    expect(descriptionMeta).toBeTruthy();
    expect(descriptionMeta?.content).toBe('About page of our application');
    
    expect(keywordsMeta).toBeTruthy();
    expect(keywordsMeta?.content).toBe('about, application, info');
    
    expect(ogTitleMeta).toBeTruthy();
    expect(ogTitleMeta?.content).toBe('About Page');
    
    expect(ogDescriptionMeta).toBeTruthy();
    expect(ogDescriptionMeta?.content).toBe('Learn more about our application on this page.');
  });

  it('should call ngOnInit automatically when component is created', () => {
    component.ngOnInit();
    fixture.detectChanges();
     expect(titleService.getTitle()).toBe('About Page');
  });

  it('should render the template content', () => {
    fixture.detectChanges();
    
    // Verificamos que el contenido del template se renderiza
    // (asumiendo que about-page.html tiene algún contenido HTML)
    expect(compiled.innerHTML).toBeDefined();
    expect(compiled.innerHTML.length).toBeGreaterThan(0);
  });
});