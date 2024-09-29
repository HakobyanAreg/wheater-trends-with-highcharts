import {Component, input, output} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    NgClass
  ],
  templateUrl: './button.component.html',
})

export class ButtonComponent {
  title = input.required<string>();
  viewerTooltip = input.required<string>();
  isViewerDisabled = input.required<boolean>();
  clicked = output<void>();
}
