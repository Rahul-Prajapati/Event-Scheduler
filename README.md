# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Event Management Project

# Login Credentials

username : stevan
password : Stevan@121

# Preferences Page

 User can choose his interest and can save his username

# Events Page 

User can check the events created by him and get a conflict Warning on the respective cards if that particular events is getting conflict with another Invited meet which is accepted by user

# Booking Page

User can checks all his events where he is host or participants which are sorted in Upcoming(accepted & upcoming meet), pending, rejected and past events.

On Clicking on Participants count, user can check all participants status.

# Availability page

User can set his availability for the week to scheduled the meet accordingly.

User can visualize his all events in calendar including filters

# Settings

User can update his basic details on this page. On Email or password updates, user will be safely logout and redirects login page to login again.



## Initial Commit

Created 4 pages and sets their routes in App.jsx file.

Created Css variables for font and color. 

## landing Page

Created landing page with signup and login button to navigate user to Signup and Signin pages

## Auth & Preferences

Created signup and login pages with validations and Preferences pages to get username and preference from user.
