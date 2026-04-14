import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { AntragService } from '../../services/antrag.service';

export type PersonType = 'natuerlich' | 'juristisch' | null;

// Simulierte Datenbank für Personalnummern
const MOCK_PERSONAL: Record<string, { vorname: string; nachname: string; strasse: string; plz: string; ort: string; land: string }> = {
  'P12345': { vorname: 'Max', nachname: 'Mustermann', strasse: 'Musterstraße 1', plz: '1010', ort: 'Wien', land: 'AT' },
  'P99999': { vorname: 'Anna', nachname: 'Beispiel', strasse: 'Ringstraße 5', plz: '8010', ort: 'Graz', land: 'AT' },
};

@Component({
  selector: 'app-antrag',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    ButtonModule, InputTextModule, DropdownModule, CalendarModule,
    StepsModule, DividerModule, MessageModule
  ],
  templateUrl: './antrag.component.html',
  styleUrls: ['./antrag.component.scss']
})
export class AntragComponent {
  step = 1;
  selectedType: PersonType = null;

  // Personalnummer-State (nur für natürliche Person)
  personalnummer = '';
  personalnummerStatus: 'idle' | 'searching' | 'found' | 'not-found' | 'skipped' = 'idle';
  personalnummerError = false;

  natForm: FormGroup;
  jurForm: FormGroup;

  laender = [
    { label: 'Österreich', value: 'AT' },
    { label: 'Deutschland', value: 'DE' },
    { label: 'Schweiz', value: 'CH' },
    { label: 'Sonstige', value: 'XX' }
  ];

  rechtsformen = [
    { label: 'GmbH', value: 'GmbH' },
    { label: 'AG', value: 'AG' },
    { label: 'OG', value: 'OG' },
    { label: 'KG', value: 'KG' },
    { label: 'Verein', value: 'Verein' },
    { label: 'Sonstige', value: 'Sonstige' }
  ];

  constructor(private fb: FormBuilder, private router: Router, private antragService: AntragService) {
    this.natForm = this.fb.group({
      strasse: ['', Validators.required],
      plz: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
      ort: ['', Validators.required],
      land: ['AT', Validators.required]
    });

    this.jurForm = this.fb.group({
      firmenname: ['', Validators.required],
      rechtsform: ['', Validators.required],
      uid: ['', Validators.required],
      gruendungsdatum: [null],
      strasse: ['', Validators.required],
      plz: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
      ort: ['', Validators.required],
      land: ['AT', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: [''],
      iban: ['', Validators.required],
      ansprechperson: ['', Validators.required]
    });
  }

  get showAdressfelder(): boolean {
    return this.personalnummerStatus === 'not-found' || this.personalnummerStatus === 'skipped';
  }

  get personFound(): boolean {
    return this.personalnummerStatus === 'found';
  }

  selectType(type: PersonType): void {
    this.selectedType = type;
    // Reset Personalnummer-State beim Wechsel
    this.resetPersonalnummer();
  }

  resetPersonalnummer(): void {
    this.personalnummer = '';
    this.personalnummerStatus = 'idle';
    this.personalnummerError = false;
    this.natForm.reset({ land: 'AT' });
  }

  suchePersonalnummer(): void {
    if (!this.personalnummer.trim()) {
      this.personalnummerError = true;
      return;
    }
    this.personalnummerError = false;
    this.personalnummerStatus = 'searching';

    // Simulierter API-Call
    setTimeout(() => {
      const found = MOCK_PERSONAL[this.personalnummer.trim().toUpperCase()];
      if (found) {
        this.personalnummerStatus = 'found';
        this.natForm.patchValue({
          strasse: found.strasse,
          plz: found.plz,
          ort: found.ort,
          land: found.land
        });
      } else {
        this.personalnummerStatus = 'not-found';
      }
    }, 800);
  }

  ohnePersonalnummer(): void {
    this.personalnummerStatus = 'skipped';
    this.personalnummer = '';
    this.natForm.reset({ land: 'AT' });
  }

  weiter(): void {
    if (this.step === 1 && this.selectedType) {
      this.step = 2;
    } else if (this.step === 2) {
      const form = this.selectedType === 'natuerlich' ? this.natForm : this.jurForm;
      if (form.valid) {
        this.step = 3;
      } else {
        form.markAllAsTouched();
      }
    }
  }

  zurueck(): void {
    if (this.step === 2) {
      this.resetPersonalnummer();
    }
    if (this.step > 1) {
      this.step--;
    }
  }

  submitAntrag(): void {
    const personenart = this.selectedType === 'natuerlich' ? 'Natürliche Person' : 'Juristische Person';
    const name = this.selectedType === 'natuerlich'
      ? `${this.natForm.value.strasse}, ${this.natForm.value.plz} ${this.natForm.value.ort}`
      : this.jurForm.value.firmenname;
    this.antragService.submitAntrag(personenart, name);
    this.router.navigate(['/antraege']);
  }

  get currentForm(): FormGroup {
    return this.selectedType === 'natuerlich' ? this.natForm : this.jurForm;
  }

  isInvalid(controlName: string): boolean {
    const ctrl = this.currentForm.get(controlName);
    return !!ctrl && ctrl.invalid && ctrl.touched;
  }
}

