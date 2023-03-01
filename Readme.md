Introduction:

This documentation is intended to provide a clear understanding of a React Native application that was developed using Axios and Local JSON server. The application consists of five screens: Login, Signup, Dashboard, AddCarScreen, and UpdateScreen. It allows users to log in, sign up, view and manage cars information, and perform various operations on them such as adding, editing, and deleting. This document will provide a brief overview of each screen and its functionality.

Installation:

Before installing the application, please ensure that you have the following:

Node.js and npm installed on your machine
A code editor such as Visual Studio Code or Atom
A mobile device or emulator to run the application
To install the application, follow the steps below:

Open the terminal and navigate to the project directory.
Run the command 'npm install' to install all the dependencies required for the application.
Run the command 'npx react-native run-android' to run the application on an Android device or emulator.
Run the command 'npx react-native run-ios' to run the application on an iOS device or simulator.
Screens:

Login Screen:
The login screen is the initial screen that the user sees when they open the application. It contains two input fields for the user to enter their email and password. If the user does not have an account, they can navigate to the signup screen by clicking the signup button. If the user has previously logged in, their details are stored in async storage, so they are directly directed to the dashboard page without entering their credentials again.

Signup Screen:
The signup screen is used to create a new account. It contains input fields for the user to enter their name, email, password, and phone number. Upon clicking the signup button, a GET request is sent to the server to check if a user with the same email address already exists. If not, the user's details are stored in the database and navigated back to the login screen.

Dashboard Screen:
The dashboard screen is where the user can view a list of cars that have been added to the database. It also contains an add car button and a logout button. Upon clicking the add car button, the user is navigated to the add car screen where they can add a new car to the database. Upon clicking the logout button, the user's details are cleared from async storage, and they are navigated back to the login screen.

AddCarScreen:
The add car screen is where the user can add a new car to the database. It contains input fields for the car's name, model, make, color, and registration number. The user must fill in all the fields before clicking the add button. Upon clicking the add button, a POST request is sent to the server to add the new car to the database. After that, the user is navigated back to the dashboard screen where the list of cars is refreshed.

UpdateScreen:
The update screen is used to edit an existing car's details. It contains input fields for the car's name, model, make, color, and registration number. Upon clicking the update button, a PUT request is sent to the server to update the car's details in the database. Upon clicking the delete button, a DELETE request is sent to the server to remove the car from the database.