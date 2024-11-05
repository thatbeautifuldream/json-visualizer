# JSON Visualizer

An application for visualizing, sharing, and analyzing JSON data with multiple viewing modes and AI-powered explanations.

![JSON Visualizer Screenshot](public/screenshot.png)

## Features

- 🎯 **Multiple Visualization Modes**

  - Raw Input: Edit and validate JSON with syntax highlighting
  - Tree View: Hierarchical representation of JSON data
  - Grid View: Tabular view for array-based JSON
  - AI Analysis: Get AI-powered explanations of your JSON structure

- 🔄 **Real-time Validation**

  - Instant JSON syntax validation
  - Clear error messages for debugging

- 🌓 **Dark/Light Mode**

  - Automatic theme detection
  - Manual theme toggle

- 📤 **Sharing Capabilities**

  - Generate shareable links for JSON snippets
  - View shared JSON with metadata

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/thatbeautifuldream/json-visualizer.git --depth 1
cd json-visualizer
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/json_visualizer"
ADMIN_KEY="your-super-secret-admin-key"
```

4. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`.

## Database Setup

1. Ensure PostgreSQL is installed and running
2. Create a new database:

```sql
CREATE DATABASE json_visualizer;
```

3. To create the tables, run the following command:

```bash
pnpm db:push
```

## Production Deployment

1. Build the application:

```bash
pnpm build
# or
npm run build
```

2. Start the production server:

```bash
pnpm start
# or
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
