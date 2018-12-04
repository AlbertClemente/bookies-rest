import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorAddComponent } from './author-add.component';

describe('AuthorAddComponent', () => {
  let component: AuthorAddComponent;
  let fixture: ComponentFixture<AuthorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
