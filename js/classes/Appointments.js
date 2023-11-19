class Appointments {
	constructor() {
		// Initialize an array to store appointments
		this.appointments = [];
	}

	addAppointment(appointment) {
		// Use spread operator to create a new array with the added appointment
		this.appointments = [...this.appointments, appointment];
	}

	deleteAppointment(id) {
		this.appointments = this.appointments.filter(
			appointment => appointment.id !== id
		);
	}

	// Method to edit an existing appointment
	editAppointment(updatedAppointment) {
		// Use the map method to create a new array, replacing the existing appointment with the updated one
		this.appointments = this.appointments.map(appointment =>
			appointment.id === updatedAppointment.id ? updatedAppointment : appointment
		);
	}
}

export default Appointments;
