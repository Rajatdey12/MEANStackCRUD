import { Router,ActivatedRoute } from '@angular/router';
import { FormBuilder ,Validators, FormGroup} from '@angular/forms';
import { ApiService } from './../../shared/api.service';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  editusersform : FormGroup;
  UsersData: any = [];
  @ViewChild('chipList',{static: true}) chipList;
  @ViewChild('reseteditusersform', {static: true}) myNgForm;

  constructor(
    private service: ApiService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.service.GetStudent(id).subscribe(data =>{
      this.UsersData =data;
      this.editusersform = this.fb.group({
        name: [data.name, [Validators.required]],
        email: [data.email, [Validators.required]],
        phone: [data.phone,[Validators.required]],
        addr: [data.addr,[Validators.required]],
        role: [data.role]
      })

    })
  }

  ngOnInit() {
    this.editUsersForm();
  }

  editUsersForm(){
    this.editusersform = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['',[Validators.required]],
      addr: ['',[Validators.required]],
      role: ['']
    })
  }
  getUsers(){
    this.service.GetStudents().subscribe(data => {
      this.UsersData = data;
    });
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.editusersform.controls[controlName].hasError(errorName);
  }  

  editUsers(){
    if (this.editusersform.valid) {
      var id = this.actRoute.snapshot.paramMap.get('id');
      if (window.confirm('Are you sure you want to update?')) {
      this.service.UpdateStudent(id, this.editusersform.value).subscribe(resp =>{
        this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
      });
      alert("User Updated Successfully!!");
    }
  }
  }

}
