import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

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

function getWeatherDataByCityName(city) {
    if(city.toLowerCase() === "bokaro") {
        return {temp: '30' , forecast: 'sunny'}
    } else if(city.toLowerCase() === "delhi") {
        return {temp: '40' , forecast: 'cloudy'}
    }else{
        return {temp: null , error: 'unable to fetch weather data'}
    }
}

server.tool("get-weather-data-by-city-name",{
    city: z.string(),

}, async({city}) => {
    return {content: [{ type: "text", text: JSON.stringify(getWeatherDataByCityName(city)) }]}
}) 


    const transport = new StdioServerTransport();
    await server.connect(transport);
