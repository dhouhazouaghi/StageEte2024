import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTypeListComponent } from './client-type-list.component';

describe('ClientTypeListComponent', () => {
  let component: ClientTypeListComponent;
  let fixture: ComponentFixture<ClientTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientTypeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
