# QoScore Installation

Step-by-step installation guide for QoScore.

## System Requirements

### Minimum Requirements

- Operating System: Windows 10+, macOS 10.14+, or Linux
- RAM: 4GB minimum, 8GB recommended
- Disk Space: 1GB for installation
- Database: PostgreSQL 12+ or MySQL 8+
- Network: Stable internet connection

### Recommended Requirements

- Operating System: Latest version of your OS
- RAM: 16GB or more
- Disk Space: 5GB or more
- Database: PostgreSQL 14+ or MySQL 8+
- Network: High-speed internet connection

## Installation Methods

### Method 1: Desktop Application

#### Windows

1. Download the installer from the official website
2. Run the installer executable as Administrator
3. Follow the installation wizard
4. Configure database connection
5. Launch QoScore from the Start menu

#### macOS

1. Download the .dmg file from the official website
2. Open the downloaded file
3. Drag QoScore to your Applications folder
4. Launch QoScore from Applications
5. Complete the initial setup wizard

#### Linux

1. Download the .deb or .rpm package

2. Install using your package manager:
   
   ```bash
   sudo dpkg -i qoscore.deb
   # or
   sudo rpm -i qoscore.rpm
   ```

3. Launch QoScore from your applications menu

4. Configure database connection

### Method 2: Web Application

1. Visit [app.qoscore.com](https://app.qoscore.com)
2. Click "Sign Up" or "Log In"
3. Create an account or sign in
4. Complete the workspace setup
5. Start using QoScore directly in your browser

### Method 3: Docker Installation

```bash
# Pull the QoScore Docker image
docker pull qoscore/qoscore:latest

# Run the container with database
docker run -d \
  -p 8080:8080 \
  -e DB_HOST=your-db-host \
  -e DB_PORT=5432 \
  -e DB_NAME=qoscore \
  -e DB_USER=qoscore \
  -e DB_PASSWORD=your-password \
  --name qoscore \
  qoscore/qoscore:latest
```

### Method 4: Source Installation

```bash
# Clone the repository
git clone https://github.com/qoscore/qoscore.git
cd qoscore

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start the application
npm start
```

## Configuration

### Environment Variables

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=qoscore
DB_USER=qoscore
DB_PASSWORD=your-secure-password

# Application Configuration
QOSCORE_PORT=8080
QOSCORE_SECRET_KEY=your-secret-key
QOSCORE_ENV=production

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@qoscore.com

# Storage Configuration
STORAGE_TYPE=local
UPLOAD_PATH=/var/qoscore/uploads
MAX_FILE_SIZE=10485760
```

### Database Setup

#### PostgreSQL

```bash
# Create database
createdb qoscore

# Run migrations
npm run migrate

# Seed initial data (optional)
npm run seed
```

#### MySQL

```bash
# Create database
mysql -u root -p
CREATE DATABASE qoscore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Run migrations
npm run migrate
```

## Verification

After installation, verify that QoScore is working correctly:

1. Open the application (web or desktop)
2. Check that you can log in
3. Create a test scoring model
4. Run a sample assessment
5. Verify all features are accessible

## Troubleshooting

### Common Issues

**Issue: Database connection fails**

- Solution: Check database credentials and ensure database server is running

**Issue: Application won't start**

- Solution: Check system requirements and ensure all dependencies are installed

**Issue: Can't connect to server**

- Solution: Check your internet connection and firewall settings

**Issue: Slow performance**

- Solution: Ensure adequate RAM and CPU resources, optimize database queries

### Getting Help

If you encounter any issues during installation:

- Check our [Documentation](./documentation)
- Visit our [Support Center](https://support.qoscore.com)
- Contact our support team
- Join our community forum
