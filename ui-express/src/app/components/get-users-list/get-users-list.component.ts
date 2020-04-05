import { Users } from './../../shared/Users';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-get-users-list',
  templateUrl: './get-users-list.component.html',
  styleUrls: ['./get-users-list.component.css']
})
export class GetUsersListComponent implements OnInit {
  UsersData: any = [];
  dataSource: MatTableDataSource<Users>;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'Users_name', 'Users_Email'];

  constructor(private usersApi : ApiService) { 
    
    this.usersApi.GetStudents().subscribe(data => {
      this.UsersData = data;
      this.dataSource = new MatTableDataSource<Users>(this.UsersData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    }) 
  }

  ngOnInit() {
  }

  deleteStudent(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.usersApi.DeleteStudent(e._id).subscribe()
    }
  }

}
