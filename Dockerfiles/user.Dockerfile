# Using a Node.js image to start with
FROM node:20.12-alpine                   

# Copy package files
 COPY package.json package-lock.json ./  
    
# Install all the project dependencies
 RUN npm install 

#Copy application source code
COPY src/ ./src/  

# Start the application in production mode
 CMD [ "npm", "start" ]                       