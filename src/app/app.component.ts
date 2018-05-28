import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly now = new Date();
  readonly users = [
    {
      name: 'Joshua Ford'
    },
    {
      name: 'Diana Torres'
    },
    {
      name: 'Andrea Reynolds'
    },
    {
      name: 'Julia Greene'
    },
    {
      name: 'Vincent Thompson'
    },
    {
      name: 'Russell Willis',
      nick: 'wololo'
    },
    {
      name: 'Walter Alvarado'
    },
    {
      name: 'Vojtěch Mašek',
      ick: 'vojta'
    },
    {
      name: 'Vojtech Mašek',
      nick: 'vojto'
    },
    {
      name: 'Tomáš Tester'
    },
    {
      name: 'Matyáš Listitem'
    },
  ];

  readonly filterForm: FormGroup = this.fb.group({
    user: '',
    users: [],
  });

  constructor(private readonly fb: FormBuilder) {
  }


  createChip(inputTarget: string, chipTarget: string): void {
    const inputValue = this.filterForm.get(inputTarget).value;

    if (!inputValue) {
      return;
    }

    const chipsValue = this.filterForm.get(chipTarget).value || [];

    if (chipsValue.includes(inputValue)) {
      // value already exists, remove text from input
      this.filterForm.patchValue({
        [inputTarget]: '',
      });
    } else {
      this.filterForm.patchValue({
        [inputTarget]: '',
        [chipTarget]: [...chipsValue, inputValue],
      });
    }
  }

  removeChipFromTarget(target: string, value: string): void {
    this.filterForm.get(target).patchValue(this.filterForm.get(target).value.filter((v: string) => v !== value));
  }
}
