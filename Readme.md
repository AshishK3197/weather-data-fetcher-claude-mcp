# Weather Agent MCP Server

This project implements a simple Model Context Protocol (MCP) server called **Weather Data Fetcher Agent**. It provides tools for fetching weather data by city name using the OpenWeatherMap API, as well as a sample addition tool for demonstration.

## Features

- **Weather Data Fetching**: Retrieve current weather data for any city using the OpenWeatherMap API.
- **Addition Tool**: A simple tool to add two numbers (for testing and demonstration).

## Requirements

- Node.js v18 or higher (for native `fetch` support)
- An OpenWeatherMap API key

## Setup

1. **Clone the repository** and install dependencies:
    ```bash
    npm install
    ```

2. **Configure Environment Variables**:

    Create a `.env` file in the root directory and add your OpenWeatherMap API key:
    ```
    OPENWEATHERMAP_API_KEY=your_api_key_here
    ```

3. **Run the MCP Server**:
    ```bash
    node index.js
    ```

## Usage

The server exposes two tools:

### 1. `get-weather-data-by-city-name`

- **Input**: `{ "city": "CityName" }`
- **Output**: Weather data as JSON

### 2. `add`

- **Input**: `{ "a": number, "b": number }`
- **Output**: Sum of `a` and `b` as text

## Project Structure

- `index.js` - Main server implementation
- `package.json` - Project metadata and dependencies
- `.env` - Environment variables (not committed)
- `.gitignore` - Ignores `node_modules` and `.env`

## Dependencies

- `@modelcontextprotocol/sdk`
- `dotenv`
- `zod`

## License

ISC
