# Veterinary Appointment Manager (VAM)

## Overview

VAM (Veterinary Appointment Manager) is a web application designed to help veterinary clinics manage their appointments efficiently. With VAM, you can easily add, edit, and delete appointments for different pets, ensuring a smooth workflow for your veterinary practice.

## Features

- **Add Appointments:** Enter details such as pet name, owner's name, phone number, date, time, and symptoms to create a new appointment.
- **Edit Appointments:** Modify appointment details and save changes.
- **Delete Appointments:** Remove appointments from the system.
- **View Appointments:** See a list of all appointments with key information.

## Technologies Used

- **Bootstrap 4.5.0:** Styling and layout.
- **JavaScript (ES6+):** Core functionality and interactivity.
- **IndexedDB:** Local database for storing appointment data.

## Project Structure

The project is organized into the following main components:

- **Classes:**

  - `App.js`: Initializes the application and sets up event listeners.
  - `Appointments.js`: Manages the collection of appointments.
  - `UI.js`: Handles user interface interactions, such as displaying alerts and appointments.

- **Functions:**

  - `functions.js`: Contains various functions for database management, form data handling, and UI interactions.

- **Selectors:**

  - `selectors.js`: Defines selectors for DOM elements used in the project.

- **Styles:**

  - `css/custom.css`: Custom styles for the application.

- **HTML:**
  - `index.html`: Main HTML file containing the structure of the web page.

## Setup

1. Clone the repository to your local machine by running the following command:
   ```bash
   git clone https://github.com/TrujiDev/VAM.git
   ```
2. Open the project folder in your preferred code editor.
3. Open `index.html` in a web browser.

## Usage

1. Fill out the form to add a new appointment.
2. Click "Create appointment" to save the appointment.
3. View, edit, or delete appointments using the provided buttons.

## System Requirements

- Supported Browsers: Chrome, Firefox, Safari
- Dependencies: None

## Data Storage

VAM uses IndexedDB to store appointment data locally. The data is accessed using the IndexedDB API and is stored in the browser's local storage.
