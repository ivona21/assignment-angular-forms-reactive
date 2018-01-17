import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { CustomValidators } from "./custom-validators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  statuses: string[] = ["Stable", "Critical", "Finished"];
  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { };

  ngOnInit() {
    this.projectForm = new FormGroup({
      "projectName": new FormControl(null, [Validators.required, CustomValidators.invalidProjectName]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "projectStatus": new FormControl("Stable")
    })
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  forbiddenProjectNames(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "Test") {
          resolve({ "forbiddenName": true })
        } else {
          resolve(null);
        }
      }, 1000)    
    })
    return promise;
  }
}
