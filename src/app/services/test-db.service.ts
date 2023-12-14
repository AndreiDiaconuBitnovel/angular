import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestDbDto } from '../Models/testDb';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TestDbService {

  private getAllTestDbRecordUrl = 'TestDB/getAllTestDbRecord';

  

  constructor(private http: HttpClient) {}

  getAllTestDbRecord() {
    return this.http.get<TestDbDto[]>(`${environment.apiUrl}/${this.getAllTestDbRecordUrl}`);
  }
}
