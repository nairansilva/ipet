/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PetFormComponent } from './petForm.component';

describe('PetFormComponent', () => {
  let component: PetFormComponent;
  let fixture: ComponentFixture<PetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
