README

# QueuedUp

###  The social media site for UCSC students interested in programming and the tech industry.

## The QueuedUp Team
- Abbas Engineer

- James Goodman

- Jay Ohana

- Haolin Liu

- Alex Davila

### :exclamation: Important: Only the CLIENT steps are required in order to run the application. FIREBASE is only required if contributions to the database are needed. :exclamation:

# CLIENT

Prior to running the local host:

$ `cd queuedup-client`

Install node_modules for client:

$ `npm install`

After installation, to run on localhost:3000 run command:

$ `npm start`

# FIREBASE

Requirements
For Windows:

Install Node.js using nvm (the Node Version Manager).
Installing Node.js automatically installs the npm command tools.

Install the Firebase CLI via npm by running the following command:

$ `npm install -g firebase-tools`

Log into Firebase using your Google account by running the following command:

$ `firebase login`

This command steps you through setting up your project directory and some Firebase products. During project initialization, the Firebase CLI asks you to complete the following tasks:

Select desired Firebase products to set up in your Firebase project:

$ `firebase init`

To deploy to a Firebase project, run the following command from your project directory:

$ `firebase deploy`

To emulate HTTP functions and hosting for testing on local URLs, use either of the following commands:

$ `firebase serve`

# TECHNOLOGY

- React: create the user interface

- Redux: maintain the state of the entire application using actions and reducers

- Material-UI: component based library used for the design elements in our React app

- Firebase: cloud storage, database, user authentication

- Express: authentication middleware
