import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MOCK_USERS } from './mock.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly users = MOCK_USERS;

  readonly userFilterForm: FormGroup = this.fb.group({
    user: '',
    users: [],
  });

  readonly userSearchForm = this.fb.group({
    user: ['']
  });

  loading: { [name: string]: boolean } = {};

  constructor(private readonly fb: FormBuilder) {
  }


  createChip(inputTarget: string, chipTarget: string): void {
    const inputValue = this.userFilterForm.get(inputTarget).value;

    if (!inputValue) {
      return;
    }

    const chipsValue = this.userFilterForm.get(chipTarget).value || [];

    if (chipsValue.includes(inputValue)) {
      // value already exists, remove text from input
      this.userFilterForm.patchValue({
        [inputTarget]: '',
      });
    } else {
      this.userFilterForm.patchValue({
        [inputTarget]: '',
        [chipTarget]: [...chipsValue, inputValue],
      });
    }
  }

  removeChipFromTarget(target: string, value: string): void {
    this.userFilterForm.get(target).patchValue(this.userFilterForm.get(target).value.filter((v: string) => v !== value));
  }

  buy(name: string) {
    this.loading[name] = true;
    // this.api.postCreateLicenseProductUserID({
    //   product: name,
    //   userID
    // }).subscribe(
    //   () => this.snackBar.open(`${name} license successfully purchased`, '', {duration: 3000}),
    //   error => this.snackBar.open(error.message, '', {duration: 5000}),
    //   () => this.loading[name] = false
    // );
  }
}
