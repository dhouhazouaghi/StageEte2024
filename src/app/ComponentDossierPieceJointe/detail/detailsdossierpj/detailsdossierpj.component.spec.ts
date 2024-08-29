import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsdossierpjComponent } from './detailsdossierpj.component';

describe('DetailsdossierpjComponent', () => {
  let component: DetailsdossierpjComponent;
  let fixture: ComponentFixture<DetailsdossierpjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsdossierpjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsdossierpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
