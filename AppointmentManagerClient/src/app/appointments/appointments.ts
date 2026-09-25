import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointment.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-appointments',
  styleUrl: './appointments.css',
  templateUrl: './appointments.html',
})
export class Appointments implements OnInit {

  showForm = false;

  appointments: any[] = [];

  newAppointment = {
    title: '',
    date: '',
    time: '',
    description: ''
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        console.log('Appointments:', data);
      },
      error: (error) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  addAppointment() {
    const appointment = {
      title: this.newAppointment.title,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      description: this.newAppointment.description,
      categoryId: 2
    };

    this.appointmentService.addAppointment(appointment).subscribe({
      next: () => {
        this.showForm = false;

        this.newAppointment = {
          title: '',
          date: '',
          time: '',
          description: ''
        };

        this.loadAppointments();
      },
      error: (error) => {
        console.error('Error adding appointment:', error);
      }
    });
  }

}