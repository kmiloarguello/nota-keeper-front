# Nota Keeper Frontend

## Project Description

Nota Keeper is a versioned note-taking web application designed to provide users with an intuitive way to manage their notes while offering the capability to track the evolution of each note over time.

### Features:

1. **View the list of notes:** Allows users to see all their notes at a glance.
2. **Create a new note:** Users can create new notes.
3. **Edit an existing note:** Users can modify their notes at any time.
4. **Delete a note:** Enables the deletion of unnecessary notes.
5. **Browse the history of note modifications:** Users can view how a note has evolved over time.
6. **Revert to a previous version:** Offers the possibility to restore an earlier version of a note.

### Technologies Used:

- **Frontend:** React with TypeScript, for a rich and interactive user experience.
- **Styling:** MUI and TailwindCSS, for a modern and responsive design.
- **State Management:** Redux, for predictable and efficient state management.
- **Containerization:** Docker, to facilitate project deployment and execution.

## Launching the Project with Docker

To launch the Nota Keeper project using Docker, follow these steps:

1. **Prerequisite:** Ensure Docker is installed on your machine.
2. **Clone the repository:** Clone the project repository to your local machine.
    ```
    git clone https://github.com/yourUsername/Nota-Keeper.git
    ```
3. **Build and Run the Docker image:** Navigate to the project directory and build the Docker image using the following command:
    ```
    docker compose -f docker-compose.yml up --build
    ```
4. **Access the application:** Open your browser and go to `http://localhost:3000` to start using Nota Keeper.


### Things to Improve

- **Add authentication and authorization:** Implement login functionality to secure user data.
- **Language support:** Add multi-language support for a more inclusive user experience.