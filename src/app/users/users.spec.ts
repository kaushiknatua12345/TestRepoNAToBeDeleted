import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.contactForm).toBeTruthy();
    expect(component.contactForm.get('name')?.value).toBe('');
    expect(component.contactForm.get('email')?.value).toBe('');
    expect(component.contactForm.get('designation')?.value).toBe('');
  });

  it('should display correct title text', () => {
    expect(component.text).toBe('User Contact Form Example');
  });

  describe('Form Validation', () => {
    it('should be invalid when empty', () => {
      expect(component.contactForm.valid).toBeFalsy();
    });

    describe('Name field', () => {
      it('should be invalid when empty', () => {
        const nameControl = component.contactForm.get('name');
        expect(nameControl?.valid).toBeFalsy();
        expect(nameControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid when less than 4 characters', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('Bob');
        expect(nameControl?.errors?.['minlength']).toBeTruthy();
      });

      it('should be valid when 4 or more characters', () => {
        const nameControl = component.contactForm.get('name');
        nameControl?.setValue('Robert');
        expect(nameControl?.valid).toBeTruthy();
      });
    });

    describe('Email field', () => {
      it('should be invalid when empty', () => {
        const emailControl = component.contactForm.get('email');
        expect(emailControl?.valid).toBeFalsy();
        expect(emailControl?.errors?.['required']).toBeTruthy();
      });

      it('should be invalid with incorrect email format', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.errors?.['email']).toBeTruthy();
      });

      it('should be valid with correct email format', () => {
        const emailControl = component.contactForm.get('email');
        emailControl?.setValue('test@example.com');
        expect(emailControl?.valid).toBeTruthy();
      });
    });

    describe('Designation field', () => {
      it('should be invalid when empty', () => {
        const designationControl = component.contactForm.get('designation');
        expect(designationControl?.valid).toBeFalsy();
        expect(designationControl?.errors?.['required']).toBeTruthy();
      });

      it('should be valid when filled', () => {
        const designationControl = component.contactForm.get('designation');
        designationControl?.setValue('Developer');
        expect(designationControl?.valid).toBeTruthy();
      });
    });
  });

  describe('Form Submission', () => {
    it('should set submitted to true when form is submitted', () => {
      expect(component.submitted).toBeFalsy();
      component.onSubmit();
      expect(component.submitted).toBeTruthy();
    });

    it('should be valid when all fields are properly filled', () => {
      component.contactForm.patchValue({
        name: 'Robert Smith',
        email: 'robert@example.com',
        designation: 'Senior Developer'
      });
      expect(component.contactForm.valid).toBeTruthy();
    });
  });
});
