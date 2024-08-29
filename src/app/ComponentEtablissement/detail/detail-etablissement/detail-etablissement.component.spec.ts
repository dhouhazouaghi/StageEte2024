import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEtablissementComponent } from './detail-etablissement.component';

describe('DetailEtablissementComponent', () => {
  let component: DetailEtablissementComponent;
  let fixture: ComponentFixture<DetailEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEtablissementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
