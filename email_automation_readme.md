# 🚀 Email Automation Engine

An enterprise-grade internal tool for automating B2B email infrastructure setup at scale. Built for Greysolve Consulting to streamline domain registration, email workspace provisioning, DNS configuration, and sequencing tool integration.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Email Automation Engine automates the complex process of setting up email infrastructure for B2B outbound campaigns. It handles everything from domain registration to email warmup, replacing manual processes that previously took hours with automated workflows that complete in minutes.

### Problem Solved
- **Manual Infrastructure Setup**: Eliminates hours of manual domain registration, DNS configuration, and email provisioning
- **Scale Limitations**: Handles 10-100+ domains per campaign efficiently
- **Error-Prone Processes**: Reduces human errors in DNS configuration and email setup
- **Client Onboarding Time**: Accelerates client campaign launches from days to hours

### Key Benefits
- ⚡ **Speed**: Automated workflows complete in minutes vs. hours manually
- 🔧 **Scale**: Handle bulk operations across 100+ domains simultaneously
- 🛡️ **Reliability**: Built-in health monitoring and error recovery
- 💰 **Cost Control**: Real-time cost estimation and budget alerts
- 🔒 **Security**: Encrypted credential storage and audit logging

## ✨ Features

### 🌐 Domain Management
- **Automated Registration**: Support for Namecheap, Cloudflare, and GoDaddy APIs
- **Bulk Operations**: Register multiple domains with naming patterns
- **Health Monitoring**: Real-time DNS and domain status tracking
- **Ownership Control**: Agency retains domain ownership for better management

### 📧 Email Workspace Provisioning
- **Google Workspace Integration**: Automated account creation and configuration
- **Wholesale Providers**: Support for alternative inbox providers
- **Scalable Setup**: Configurable inboxes per domain (default: 3)
- **Client Billing**: Direct client payment method integration

### 🔧 DNS Configuration
- **Automated Records**: SPF, DKIM, DMARC, and MX record setup
- **Verification System**: Domain verification with workspace providers
- **Health Diagnostics**: DNS propagation monitoring and issue detection
- **Bulk Updates**: Mass DNS configuration changes across domains

### 🎯 Sequencing Tool Integration
- **Multi-Platform Support**: Smartlead, Lemlist, and Instantly integration
- **Automated Connection**: Direct inbox-to-sequencer linking
- **Warmup Management**: Automated email warmup process initialization
- **Performance Tracking**: Warmup progress and sending limit monitoring

### 📊 Campaign Management
- **Template System**: Save and reuse campaign configurations
- **Cost Estimation**: Real-time pricing calculation before execution
- **Progress Tracking**: Live updates during campaign setup
- **Bulk Creation**: Pattern-based domain and inbox generation

### 🔐 Security & Compliance
- **Encrypted Storage**: Secure API credential management
- **Audit Logging**: Complete activity tracking and compliance
- **Two-Factor Auth**: Enhanced security for sensitive operations
- **Cost Warnings**: Prominent alerts before expensive actions

## 🏗️ Architecture

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │   n8n Workflows │    │  External APIs  │
│                 │    │                 │    │                 │
│ • Dashboard     │◄──►│ • Campaign Exec │◄──►│ • Registrars    │
│ • Campaign Mgmt │    │ • Domain Ops    │    │ • Google WS     │
│ • Domain Mgmt   │    │ • DNS Config    │    │ • Sequencers    │
│ • Settings      │    │ • Progress Track│    │ • Webhooks      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        
         │              ┌─────────────────┐               
         └──────────────►│     Redis       │               
                        │ Progress Tracking│               
                        └─────────────────┘               
                                 │                         
                        ┌─────────────────┐               
                        │ PostgreSQL/MySQL│               
                        │ Persistent Data │               
                        └─────────────────┘               
```

### Key Components

**Frontend (React + TypeScript)**
- Modern React application with TypeScript
- Tailwind CSS for styling
- React Query for server state management
- Smart polling for real-time updates

**Backend (n8n Workflows)**
- 37+ specialized workflows for different operations
- RESTful API endpoints via webhooks
- Redis-based progress tracking
- Error handling and retry logic

**Data Layer**
- **Redis**: Real-time progress and session data
- **PostgreSQL/MySQL**: Persistent application data
- **Encrypted Storage**: Secure API credentials

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **HTTP Client**: Axios with interceptors

### Backend
- **Workflow Engine**: n8n (primary orchestrator)
- **Database**: PostgreSQL/MySQL
- **Cache/Sessions**: Redis
- **API**: RESTful endpoints via n8n webhooks

### External Integrations
- **Domain Registrars**: Namecheap, Cloudflare, GoDaddy
- **Email Providers**: Google Workspace, Wholesale providers
- **Sequencing Tools**: Smartlead, Lemlist, Instantly

### DevOps & Deployment
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Application and infrastructure monitoring
- **Security**: SSL/TLS, encrypted storage, audit logging

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose
- PostgreSQL/MySQL database
- Redis instance
- n8n installation

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/email-automation-engine.git
   cd email-automation-engine
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend (if applicable)
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment templates
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   ```

4. **Configure Environment Variables**
   ```bash
   # Database configuration
   DATABASE_URL=postgresql://user:pass@localhost:5432/email_automation
   REDIS_URL=redis://localhost:6379

   # n8n configuration
   N8N_HOST=https://your-n8n-instance.com
   N8N_API_KEY=your-n8n-api-key

   # API Keys (encrypted in production)
   NAMECHEAP_API_KEY=your-namecheap-key
   CLOUDFLARE_API_TOKEN=your-cloudflare-token
   GOOGLE_SERVICE_ACCOUNT=path-to-service-account.json
   ```

5. **Database Setup**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

6. **Start Development Servers**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up -d

   # Or manually
   npm run dev:frontend  # React app on :3000
   npm run dev:backend   # API server on :8000
   ```

### Quick Start with Docker

```bash
# Clone and start everything
git clone https://github.com/your-org/email-automation-engine.git
cd email-automation-engine
cp .env.example .env
docker-compose up -d

# Access the application
open http://localhost:3000
```

## 📖 Usage

### Creating a New Campaign

1. **Navigate to Campaign Setup**
   - Click "New Campaign" in the main navigation
   - Fill in campaign details and client information

2. **Configure Domains**
   - Set domain count and naming patterns
   - Choose registrar and configuration options
   - Review cost estimation

3. **Setup Email Workspace**
   - Select workspace provider (Google Workspace recommended)
   - Configure inbox count per domain
   - Set naming patterns for email addresses

4. **Sequencing Tool Integration**
   - Choose your sequencing platform
   - Configure warmup settings
   - Set sending limits and schedules

5. **Review and Execute**
   - Review all settings and cost breakdown
   - Confirm execution (with cost warning)
   - Monitor progress in real-time

### Managing Domains

```bash
# Bulk operations available:
- Register multiple domains with patterns
- Update DNS records across domains
- Monitor health status
- Export domain lists and configurations
```

### DNS Configuration

```bash
# Automated DNS setup includes:
- SPF records for email authentication
- DKIM keys for domain verification
- DMARC policies for email security
- MX records for email routing
```

## 📚 API Documentation

### Core Endpoints

#### Campaign Management
```http
POST /api/campaigns
GET /api/campaigns
GET /api/campaigns/{id}
PUT /api/campaigns/{id}
DELETE /api/campaigns/{id}
```

#### Domain Operations
```http
GET /api/domains
POST /api/domains/register
POST /api/domains/bulk-register
GET /api/domains/{id}/health
PUT /api/domains/{id}/dns
```

#### Progress Tracking
```http
GET /api/operations/{id}/status
GET /api/operations/{id}/logs
POST /api/operations/{id}/cancel
```

#### System Configuration
```http
GET /api/settings
PUT /api/settings
POST /api/settings/test-connection
GET /api/settings/balances
```

### Webhook Endpoints

n8n workflows expose webhook endpoints for frontend integration:

```http
POST /webhook/campaign-setup
POST /webhook/domain-registration
POST /webhook/dns-configuration
GET /webhook/operation-status/{id}
```

## 💻 Development

### Project Structure

```
email-automation-engine/
├── frontend/                 # React TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand stores
│   │   ├── types/          # TypeScript definitions
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # n8n workflows and configurations
│   ├── workflows/          # n8n workflow JSON files
│   ├── credentials/        # Credential templates
│   └── docs/              # Backend documentation
├── database/               # Database migrations and seeds
│   ├── migrations/
│   └── seeds/
├── docs/                   # Project documentation
├── docker-compose.yml      # Development environment
└── README.md
```

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/your-feature-name
   npm run dev
   # Make changes
   npm run test
   npm run lint
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

2. **Testing**
   ```bash
   # Frontend tests
   cd frontend
   npm run test
   npm run test:e2e
   
   # Backend workflow tests
   cd backend
   npm run test:workflows
   ```

3. **Code Quality**
   ```bash
   npm run lint        # ESLint + Prettier
   npm run typecheck   # TypeScript validation
   npm run audit       # Security audit
   ```

### n8n Workflow Development

1. **Workflow Structure**
   ```
   [Trigger] → [Validation] → [Redis Update] → [API Call] → [Redis Update] → [Complete]
   ```

2. **Error Handling Pattern**
   ```
   [Main Flow] → [Error Node] → [Retry Logic] → [Fallback] → [Notification]
   ```

3. **Progress Tracking**
   ```javascript
   // Redis update pattern in n8n
   {
     "operation_id": "{{ $node.parameter.operationId }}",
     "version": "{{ $node.context.version + 1 }}",
     "status": "in_progress",
     "progress": 45,
     "currentStep": "provisioning_inboxes"
   }
   ```

## 🚢 Deployment

### Production Environment

1. **Infrastructure Requirements**
   - **Application Server**: 2+ CPU cores, 4GB+ RAM
   - **Database**: PostgreSQL 13+ with backup strategy
   - **Cache**: Redis 6+ for session management
   - **n8n Instance**: Dedicated server or cloud hosting

2. **Deployment Steps**
   ```bash
   # Build production assets
   npm run build
   
   # Deploy with Docker
   docker-compose -f docker-compose.prod.yml up -d
   
   # Or manual deployment
   npm run deploy:production
   ```

3. **Environment Configuration**
   ```bash
   # Production environment variables
   NODE_ENV=production
   DATABASE_URL=postgresql://prod-user:pass@prod-db:5432/email_automation
   REDIS_URL=redis://prod-redis:6379
   
   # Security
   JWT_SECRET=your-secure-jwt-secret
   ENCRYPTION_KEY=your-encryption-key
   ```

### Monitoring & Maintenance

- **Application Monitoring**: Health checks and performance metrics
- **Error Tracking**: Centralized error logging and alerting
- **Backup Strategy**: Automated database and Redis backups
- **Security Updates**: Regular dependency and security updates

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Testing**: Unit tests for all business logic
- **Documentation**: JSDoc comments for public APIs
- **Git**: Conventional commit messages

### Pull Request Process

1. Update documentation for any new features
2. Add tests for bug fixes and new functionality
3. Ensure CI/CD pipeline passes
4. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-org/email-automation-engine/issues)
- **Documentation**: [Project Wiki](https://github.com/your-org/email-automation-engine/wiki)
- **Email**: info@greysolve.com

## 🙏 Acknowledgments

- Built for WQ Revenue's B2B email automation needs
- Inspired by modern DevOps and automation practices
- Thanks to the open-source community for excellent tools and libraries

---

**Built with ❤️ by the WQ Revenue Development Team**