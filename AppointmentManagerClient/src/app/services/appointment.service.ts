import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'https://localhost:7191/api/Appointments';

  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAppointment(appointment: any) {
    return this.http.post<any>(this.apiUrl, appointment);
  }

  updateAppointment(id: number, appointment: any) {
    return this.http.put(`${this.apiUrl}/${id}`, appointment);
  }

  deleteAppointment(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}