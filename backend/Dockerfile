# Use the official Golang image as a base image
FROM golang:1.24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the Go application
RUN mkdir target
RUN go build -o ./target/ ./...
RUN chmod +x ./target/*

# Use a minimal base image for the final container
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/target/* .

# Expose the application port (adjust as needed)
EXPOSE 1909

# Command to run the application
ENTRYPOINT ["./memory-snap"]