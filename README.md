  IATD-devOps-assessment-Project: This project demonstrates best practices in Git version control ,unit testing, Docker image management,
  and CI/CD pipelines using GitHub Actions. 

 Tasks Overview

Task 1: Commit History

    Commits are structured clearly to reflect meaningful changes.
    Followed Git best practices with clear, task-related commit messages.

Task 2:  ESLint Integration 

    ESLint runs automatically on each commit through a GitHub Actions workflow.
    Integrated ESLint in the GitHub Actions workflow to ensure code quality.

 Task 3:  Unit Testing 
 
    Wrote comprehensive unit tests for all specified utility functions.
    utilities.test.js contains unit tests covering all specified requirements.
    All tests pass successfully, ensuring reliability.

  Task 4:  Docker CI Integration 

     A GitHub Actions workflow builds and pushes a Docker image using test.Dockerfile.
     Configured GitHub Actions to build Docker images only if all CI steps pass.
     This approach helps maintain stability and integrity throughout the deployment pipeline.

  Task 5:  Docker Image Optimization & Dual Build 

     test.Dockerfile excludes unnecessary directories (.git, .github, node_modules) to reduce image size and avoid leaking sensitive data.
     user.Dockerfile follows best practices and builds an optimized production-like image.
     The GitHub Actions workflow:
        Builds both Docker images (test and user)
        Pushes both to the specified Docker Hub repository
     The Docker Hub repository contains:(https://hub.docker.com/repositories/prerana464)
       My-repo:test
       My-repo:user

