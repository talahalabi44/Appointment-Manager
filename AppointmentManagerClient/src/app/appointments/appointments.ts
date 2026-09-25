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
  editing = false;

  appointments: any[] = [];

  newAppointment = {
    id: 0,
    title: '',
    date: '',
    time: '',
    description: '',
    categoryId: 2
  };

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
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
      time: this.newAppointment.time + ':00',
      description: this.newAppointment.description,
      categoryId: 2
    };

    console.log('Sending appointment:', appointment);

    this.appointmentService.addAppointment(appointment).subscribe({
      next: () => {
        this.closeForm();
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Error adding appointment:', error);
      }
    });
  }

  editAppointment(appointment: any) {
    this.editing = true;
    this.showForm = true;

    this.newAppointment = {
      id: appointment.id,
      title: appointment.title,
      date: appointment.date.substring(0, 10),
      time: appointment.time.substring(0, 5),
      description: appointment.description,
      categoryId: appointment.categoryId
    };
  }

  updateAppointment() {
    const appointment = {
      id: this.newAppointment.id,
      title: this.newAppointment.title,
      date: this.newAppointment.date,
      time: this.newAppointment.time + ':00',
      description: this.newAppointment.description,
      categoryId: this.newAppointment.categoryId
    };

    this.appointmentService.updateAppointment(
      this.newAppointment.id,
      appointment
    ).subscribe({
      next: () => {
        this.closeForm();
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Error updating appointment:', error);
      }
    });
  }

  deleteAppointment(id: number) {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    this.appointmentService.deleteAppointment(id).subscribe({
      next: () => {
        this.loadAppointments();
      },
      error: (error) => {
        console.error('Error deleting appointment:', error);
      }
    });
  }

  closeForm() {
    this.showForm = false;
    this.editing = false;

    this.newAppointment = {
      id: 0,
      title: '',
      date: '',
      time: '',
      description: '',
      categoryId: 2
    };
  }
}