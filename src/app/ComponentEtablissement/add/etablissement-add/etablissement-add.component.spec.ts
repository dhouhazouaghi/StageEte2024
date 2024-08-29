import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementAddComponent } from './etablissement-add.component';

describe('EtablissementAddComponent', () => {
  let component: EtablissementAddComponent;
  let fixture: ComponentFixture<EtablissementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtablissementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
