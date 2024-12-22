# Hexabot ReliefWeb Plugin

This plugin integrates ReliefWeb's API into Hexabot, allowing users to search and retrieve humanitarian information, reports, and updates.

## Features
- Search ReliefWeb's database for humanitarian reports and updates
- Filter by various parameters (country, disaster type, etc.)
- Sort results by date or relevance
- Customizable response fields

## Prerequisites
- Node.js
- Hexabot installation
- Internet connection to access ReliefWeb API

## Installation
1. Copy this plugin to your Hexabot's plugins directory
2. Install dependencies:
```bash
npm install
```

## Configuration
The plugin can be configured through the following settings:

- `appname`: Your application name for ReliefWeb API requests
- `endpoint`: API endpoint to query (reports, disasters, jobs, etc.)
- `limit`: Number of results to return (default: 10)
- `query_operator`: How to combine search terms (AND/OR)
- `fields`: Fields to include in the response
- `sort`: Sort order for results (e.g., "date:desc")

## Usage
The plugin responds to keywords like "relief", "humanitarian", or "disaster". Example queries:

- "Show me recent reports about floods in Pakistan"
- "Find humanitarian updates about Syria"
- "Get disaster reports from the last month"

## API Documentation
For more information about the ReliefWeb API, visit:
https://apidoc.reliefweb.int/
