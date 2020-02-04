import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

myForm: FormGroup;
post: any;
description = '';
name = '';
titleAlert = 'This field is required';

constructor(private fb: FormBuilder) {
  this.myForm = fb.group({
    name: [null, Validators.required],
    description: [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
    validate: ''
  });
}
ngOnInit() {
  this.myForm.get('validate').valueChanges.subscribe(
    (validate) => {
      if (validate === 1) {
        this.myForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = 'You need at least 3 characters.';
      } else {
        this.myForm.get('name').setValidators(Validators.required);
      }
    }
  );
}

addPost(post) {
  this.description = post.description;
  this.name = post.name;
}

}
