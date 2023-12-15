import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 count =signal(0)

 update(event: Event){
  const input = event.target as HTMLInputElement;
  this.count.set(parseInt(input.value));
}

passwordLength = 0; // Default length
includeUppercase = false;
includeLowercase = false;
includeNumbers = false;
includeSymbols = false;

// Update state methods
updatePasswordLength(length: number) {
  this.passwordLength = length;
}

toggleUppercase() {
  this.includeUppercase = !this.includeUppercase;
}

toggleLowercase() {
  this.includeLowercase = !this.includeLowercase;
}

toggleNumbers() {
  this.includeNumbers = !this.includeNumbers;
}

toggleSymbols() {
  this.includeSymbols = !this.includeSymbols;
}

generatedPassword: string = '';

// Generate password function
generatePassword() {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+{}:"<>?|[];,./\'';
  let validChars = '';

  if (this.includeUppercase) validChars += uppercaseChars;
  if (this.includeLowercase) validChars += lowercaseChars;
  if (this.includeNumbers) validChars += numberChars;
  if (this.includeSymbols) validChars += symbolChars;

  // Check if validChars is not empty
  if (!validChars) {
    console.error('No character types selected');
    this.generatedPassword = '';
    return;
  }

  let generatedPassword = '';
  for (let i = 0; i < this.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    generatedPassword += validChars[randomIndex];
  }

  this.generatedPassword = generatedPassword;
}


copyPassword() {
  navigator.clipboard.writeText(this.generatedPassword).then(() => {
    alert('Password Successfully Copied');
  }, (err) => {
    console.error('Async: Could not copy text: ', err);
  });
}

getPasswordStrength() {
  const length = this.passwordLength;
  const variety = [this.includeUppercase, this.includeLowercase, this.includeNumbers, this.includeSymbols].filter(v => v).length;

  if (length >= 20 && variety === 4) {
    return { strength: 'Very Strong', color: 'green' };
  } else if (length >= 9 && variety >= 3) {
    return { strength: 'Strong', color: 'light-green' };
  } else if (length >= 6) {
    return { strength: 'Medium', color: 'yellow' };
  } else if (length >= 3) {
    return { strength: 'Weak', color: 'orange' };
  } else {
    return { strength: 'Very Weak', color: 'red' };
  }
}

}
