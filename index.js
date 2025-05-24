import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config();

// Create an MCP server
const server = new McpServer({
  name: "Weather Data Fetcher Agent",
  version: "1.0.0"
});

// Add an addition tool to test
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

async function getWeatherDataByCityName(city) {
    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b26c92417fd3678d52eac12dc870222`;
        console.log('Making request to:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Weather API error: ${errorData.message || response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        throw error;
    }
}

server.tool("get-weather-data-by-city-name", {
    city: z.string(),
}, async({city}) => {
    try {
        const weatherData = await getWeatherDataByCityName(city);
        return {
            content: [{ 
                type: "text", 
                text: JSON.stringify(weatherData, null, 2) 
            }]
        };
    } catch (error) {
        return {
            content: [{ 
                type: "text", 
                text: `Error: ${error.message}` 
            }]
        };
    }
});

const transport = new StdioServerTransport();
await server.connect(transport);