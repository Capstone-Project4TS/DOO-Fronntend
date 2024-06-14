# Frontend

## Currently Working On

- Auth login: The authentication login is functional but might need some improvements.
- Logout: Currently, the logout functionality only deletes the local session. It does not send an API request yet. This will be implemented soon.

## Getting Started

Before you start, make sure you have `pnpm` installed on your system. If you don't have `pnpm`, you can also use `npm`.

Follow these steps to get started:

1. Clone the repository:

  ```
  git clone <repository-url>
  ```

2. Navigate into the cloned repository:

  ```
  cd <repository-name>
  ```

3. Install the dependencies:
  Using `pnpm`:

  ```
  pnpm install
  ```

  Or using `npm`:

  ```
  npm install
  ```

4. Create a `.env` file in the root of your project. You should have a running backend service and the structure of the `.env` file can be found in the `.env.example` file in the project.

5. Start the development server:
  Using `pnpm`:

  ```
  pnpm dev
  ```

  Or using `npm`:

  ```
  npm run dev
  ```

Now, you should be able to see the application running at `http://localhost:3000` (or whatever port you have set in your `.env` file).
