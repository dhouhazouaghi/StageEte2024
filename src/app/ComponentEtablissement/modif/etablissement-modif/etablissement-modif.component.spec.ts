import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementModifComponent } from './etablissement-modif.component';

describe('EtablissementModifComponent', () => {
  let component: EtablissementModifComponent;
  let fixture: ComponentFixture<EtablissementModifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementModifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtablissementModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
