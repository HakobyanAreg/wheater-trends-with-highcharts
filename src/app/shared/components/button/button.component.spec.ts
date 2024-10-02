import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import {ComponentRef} from "@angular/core";
import {MatTooltipModule} from "@angular/material/tooltip";

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let componentRef: ComponentRef<ButtonComponent>
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTooltipModule
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    componentRef = fixture.componentRef
    component = fixture.componentInstance;

    componentRef.setInput('title', 'Test Button');
    componentRef.setInput('viewerTooltip', 'Tooltip text');
    componentRef.setInput('isViewerDisabled', false);

    fixture.detectChanges();
    buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button title', () => {
    expect(buttonElement.textContent).toContain('Test Button');
  });

  it('should not be disabled when isViewerDisabled is false', () => {
    expect(buttonElement.disabled).toBe(false);
  });

  it('should emit clicked event when button is clicked', () => {
    spyOn(component.clicked, 'emit');
    buttonElement.click();
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should be disabled when isViewerDisabled is true', () => {
    componentRef.setInput('isViewerDisabled', true);
    fixture.detectChanges();
    expect(buttonElement.disabled).toBe(true);
  });

  it('should apply cursor-not-allowed class when isViewerDisabled is true', () => {
    componentRef.setInput('isViewerDisabled', true);
    fixture.detectChanges();
    expect(buttonElement.parentElement?.classList).toContain('cursor-not-allowed');
  });
});
