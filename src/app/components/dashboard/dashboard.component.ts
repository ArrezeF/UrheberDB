import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { AuthService } from '../../services/auth.service';

export interface Produktion {
  id: string;
  titel: string;
  sender: string;
  datum: string;
  uhrzeit: string;
  dauer: string;
}

export interface OnlineProduktion {
  id: string;
  titel: string;
  plattform: string;
  veroeffentlicht: string;
  offline: string;
  onlineDauer: string;
  abrufe: string;
}

export interface RadioProduktion {
  id: string;
  titel: string;
  sender: string;
  datum: string;
  uhrzeit: string;
  dauer: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, TagModule, TabViewModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public auth: AuthService) {}

  tvProduktionen: Produktion[] = [
    { id: 'TV-001', titel: 'Mein Werk – Dokumentation', sender: 'ORF 1', datum: '15.01.2024', uhrzeit: '20:15', dauer: '45 min' },
    { id: 'TV-002', titel: 'Mein Werk – Dokumentation', sender: 'ORF 2', datum: '22.01.2024', uhrzeit: '22:00', dauer: '45 min' },
    { id: 'TV-003', titel: 'Kurzfilm Compilation', sender: 'ORF 1', datum: '03.02.2024', uhrzeit: '23:30', dauer: '12 min' },
    { id: 'TV-004', titel: 'Musiksendung Spezial', sender: 'ORF 2', datum: '14.03.2024', uhrzeit: '21:05', dauer: '60 min' },
    { id: 'TV-005', titel: 'Mein Werk – Wiederholung', sender: 'ORF III', datum: '01.04.2024', uhrzeit: '15:00', dauer: '45 min' },
  ];

  onlineProduktionen: OnlineProduktion[] = [
    { id: 'ON-001', titel: 'Mein Werk – Dokumentation', plattform: 'ORF ON', veroeffentlicht: '15.01.2024', offline: '15.04.2024', onlineDauer: '90 Tage', abrufe: '12.450' },
    { id: 'ON-002', titel: 'Kurzfilm Compilation', plattform: 'ORF ON', veroeffentlicht: '03.02.2024', offline: '03.05.2024', onlineDauer: '90 Tage', abrufe: '3.210' },
    { id: 'ON-003', titel: 'Musiksendung Spezial', plattform: 'ORF ON', veroeffentlicht: '14.03.2024', offline: '14.06.2024', onlineDauer: '92 Tage', abrufe: '8.740' },
    { id: 'ON-004', titel: 'Making-of Beitrag', plattform: 'ORF ON', veroeffentlicht: '20.03.2024', offline: '—', onlineDauer: 'unbegrenzt', abrufe: '1.890' },
  ];

  radioProduktionen: RadioProduktion[] = [
    { id: 'RD-001', titel: 'Musikbeitrag – Ö3', sender: 'Ö3', datum: '10.01.2024', uhrzeit: '08:15', dauer: '3 min 20 sek' },
    { id: 'RD-002', titel: 'Feature – Ö1', sender: 'Ö1', datum: '25.01.2024', uhrzeit: '14:00', dauer: '25 min' },
    { id: 'RD-003', titel: 'Musikbeitrag – Ö3', sender: 'Ö3', datum: '12.02.2024', uhrzeit: '17:45', dauer: '3 min 20 sek' },
    { id: 'RD-004', titel: 'Kulturjournal', sender: 'Ö1', datum: '05.03.2024', uhrzeit: '07:05', dauer: '15 min' },
    { id: 'RD-005', titel: 'Musikbeitrag – FM4', sender: 'FM4', datum: '18.03.2024', uhrzeit: '20:00', dauer: '4 min 10 sek' },
  ];

  get tvGesamt(): number { return this.tvProduktionen.length; }
  get onlineGesamt(): number { return this.onlineProduktionen.length; }
  get radioGesamt(): number { return this.radioProduktionen.length; }
  get alleGesamt(): number { return this.tvGesamt + this.onlineGesamt + this.radioGesamt; }
}
