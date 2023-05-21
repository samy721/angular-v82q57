import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
  <label for="type">Type:</label>
  <select id="type" name="type" [(ngModel)]="selectedType" (change)="onTypeChange($event.target.value)" class="form-control">
    <option value="input">Input box</option>
    <option value="single">Single select</option>
    <option value="multi">Multi select</option>
    <option value="date">Date</option>
  </select>
  
  <div *ngIf="selectedType === 'single' || selectedType === 'multi'" class="form-group">
    <label for="options">Options:</label>
    <select id="options" name="options" class="form-control">
      <option *ngFor="let option of options" [value]="option">{{ option }}</option>
    </select>
  
    <div *ngIf="editingOption" class="form-inline">
      <input type="text" [(ngModel)]="newOption" class="form-control">
      <button (click)="addOption()" class="btn btn-primary">Add</button>
      <button (click)="cancelOption()" class="btn btn-default">Cancel</button>
    </div>
    <div *ngIf="!editingOption">
      <button (click)="editOption()" class="btn btn-primary">Add Option</button>
    </div>
  </div>
  `,
})
export class App {
  selectedType: string = '';
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  editingOption: boolean = false;
  newOption: string = '';

  onTypeChange(selectedValue: string) {
    if (this.selectedType !== 'single' && this.selectedType !== 'multi') {
      this.editingOption = false;
    }
  }

  editOption() {
    this.editingOption = true;
    this.newOption = '';
  }

  addOption() {
    if (this.newOption.trim() !== '') {
      this.options.push(this.newOption);
      this.newOption = '';
      this.editingOption = false;
    }
  }

  cancelOption() {
    this.editingOption = false;
    this.newOption = '';
  }
}

bootstrapApplication(App);
