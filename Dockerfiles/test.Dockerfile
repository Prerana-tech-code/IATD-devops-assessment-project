  
# Using a Node.js image to start with
 FROM node:20.12-alpine                   


# Copy the files needed to install npm packages
 COPY package.json package-lock.json ./  
    
# Install all the project dependencies
 RUN npm install 

 # copy everything else, your app code, tests, etc.
 COPY ./ ./     

 # When the container runs, this will run test cases
 CMD [ "npm", "test" ]                       