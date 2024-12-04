# CommuniCare

**CommuniCare** is a platform designed to streamline and simplify the processes within your local barangay, making essential services more efficient, accessible, and user-friendly. Whether it's requesting documents, filing reports, scheduling appointments, or accessing vital community resources, **CommuniCare** brings the barangay's services to your fingertips, empowering citizens and strengthening community engagement.

---

## Features

- **Document Requests**: Easily request and track important documents from your barangay.
- **Report Filing**: Submit and follow up on reports for incidents or issues in the community.
- **Appointment System**: Schedule and manage appointments within the barangay for a variety of services.
- **Community Bulletin**: Stay informed about local news, events, and announcements through the community bulletin.
- **Resource Directory**: Access important locations and contact information within the barangay, such as government offices, health centers, and emergency services.
- **Barangay Emergency Alert System**: Stay up-to-date with real-time emergency alerts, including natural disasters, health emergencies, or urgent community notifications. Receive push notifications and alerts directly on your device to keep you safe and informed during emergencies.

---

## Tech Stack

- **Frontend**: 
  - **JavaScript** (Next.js)
  - **Tailwind CSS**
  
- **Backend**: 
  - **Java** (Spring Boot)

- **Database**: 
  - **MySQL** (Local)

---

## Getting Started

To run the CommuniCare platform locally, follow these steps:

### Prerequisites

- **Node.js** (for Next.js app)
- **Java** (for Spring Boot backend)
- **MySQL** (local database setup)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/communicare.git ./
    ```

2. **Frontend Setup** (Next.js with Tailwind CSS)

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3. **Database Setup** (MySQL)

    - Install **MySQL** locally and configure it.
    - Create a new database in MySQL for the project:
    
      ```sql
      CREATE DATABASE dbdemo;
      ```
    - Update your **application.properties** (or equivalent) file in the Spring Boot backend with the correct database connection details:

      ```properties
      spring.datasource.url=jdbc:mysql://localhost:3306/dbdemo
      spring.datasource.username=root
      spring.datasource.password=your_password
      spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
      server.error.include-stacktrace=never
      ```

4. **Access the application**

    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8080](http://localhost:8080) (or the configured port)

---

## The CommuniCare Team <3
- Borres, Joshua Jhonn
- Carabio, Bianca Jessa
- Mier, France Gieb
- Villarazo, Bermar Jr.


