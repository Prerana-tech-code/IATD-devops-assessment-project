  
# Using a Node.js image to start with
 FROM node:20.12-alpine                   

# Copy package files to install dependencies
 COPY package.json package-lock.json ./  
    
# Install all the project dependencies
 RUN npm install 

# Avoid copying everything to reduce image size and avoid security risks
# COPY ./ ./    # Not using to avoid copying unnecessary files (.git,.github, Dockerfiles and node_modules)

# Copy application and test files
COPY src/ ./src/
COPY tests/ ./tests/

# Copy config files used during testing
COPY eslint.config.mjs ./
COPY jest.config.mjs ./

# Run test cases when the container starts
 CMD [ "npm", "test" ]                       