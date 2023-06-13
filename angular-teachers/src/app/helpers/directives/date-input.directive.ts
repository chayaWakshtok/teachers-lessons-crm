import { Directive, forwardRef, ElementRef, Renderer2, HostListener } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Directive({
  selector: 'input[type="date"][ngModel], input[type="date"][formControlName], input[type="date"][formControl],input[type="datetime"][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateAccessor),
      multi: true,
    },
  ],
})
export class DateAccessor implements ControlValueAccessor {
  private fnChange: (value: Date) => void = () => void 0;
  private fnTouched: () => void = () => void 0;

  constructor(
    private readonly host: ElementRef,
    private readonly renderer: Renderer2,
  ) {}

  @HostListener('input', ['$event'])
  private onInput(event: any) {
    const newValue = new Date(event.target.value);
    this.fnChange(newValue);
  }

  writeValue(obj: Date): void {
    this.renderer.setProperty(this.host.nativeElement, 'valueAsNumber', obj?.getTime() ?? '');
  }

  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.host.nativeElement, 'disabled', isDisabled);
  }
}
