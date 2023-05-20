# National Aviation University of Kyiv Guide Web App

This web application is designed to provide a comprehensive guide for the university, offering various links to different university sources categorized by topics. It also includes a flexible admin mode that enables administrators to manage categories, create links, and customize the app's appearance. Regular users can add preferred links to their bookmarks, and the app also offers a dark theme option for better usability.

## Features

- **Categorized Links:** The web app provides a collection of links to various university sources such as departments, courses, library resources, and more. These links are organized into different categories for easy navigation.

- **Admin Mode:** Administrators have access to an admin mode where they can create new categories, choose icons for them, and add links to each category. This allows for the continuous updating and customization of the app's content.

- **User Bookmarks:** Regular users can add their preferred links to their bookmarks, allowing them to quickly access their most frequently used university resources.

- **Dark Theme:** The app offers a dark theme option to enhance readability and reduce eye strain, especially during nighttime usage.

## Tech Stack

The web app is built using the following technologies:

- **React JS:** A popular JavaScript library for building user interfaces. React provides a component-based architecture, making it easy to create reusable UI elements.

- **Material-UI:** A React UI framework that implements Material Design principles. Material-UI offers a set of pre-designed components and styling options for a polished and consistent user interface.

- **Node.js:** A JavaScript runtime environment that allows running JavaScript on the server-side. It provides the foundation for building scalable and efficient web applications.

- **Express:** A minimalistic web application framework for Node.js. Express simplifies the process of building server-side logic and handling HTTP requests/responses.

- **MongoDB:** A NoSQL database that stores data in a flexible, JSON-like format called BSON (Binary JSON). MongoDB is known for its scalability and ability to handle large amounts of data.

## Installation

To run the National Aviation University of Kyiv Guide Web App locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/treizeez/nauguide.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nauguide
   ```

3. Install the dependencies for the client-side (React JS) and open client:

   ```bash
   cd client
   npm install
   npm start
   ```

4. Install the dependencies for the server-side (Node.js and Express):

   ```bash
   cd ../server
   npm install
   ```

5. Start the development server:

   ```bash
   npm start
   ```

6. Access the web app in your browser at http://localhost:3000. The server is at http://localhost:5000.

## Admin mode screenshots

![Admin auth](https://github.com/treizeez/nauguide/tree/main/screenshots/1.jpg?raw=true)
![Add new category](https://github.com/treizeez/nauguide/tree/main/screenshots/2.jpg)
![Edit field](https://github.com/treizeez/nauguide/tree/main/screenshots/3.jpg)
![Edit category](https://github.com/treizeez/nauguide/tree/main/screenshots/4.jpg)
![Edit link](https://github.com/treizeez/nauguide/tree/main/screenshots/5.jpg)
![Add link](https://github.com/treizeez/nauguide/tree/main/screenshots/6.jpg)
![Add source](https://github.com/treizeez/nauguide/tree/main/screenshots/7.jpg)
![Add field](https://github.com/treizeez/nauguide/tree/main/screenshots/8.jpg)
