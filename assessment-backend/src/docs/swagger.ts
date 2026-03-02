import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Core API - Assessment Backend",
      version: "1.0.0",
      description: "API documentation for the School Core dashboard backend",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Local Development Server",
      },
      {
        url: "https://schoolcore-api.example.com",
        description: "Production Server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", description: "Randomized 12-char string ID" },
            title: {
              type: "string",
              enum: ["mr", "mrs", "miss", "ms"],
            },
            firstName: { type: "string" },
            lastName: { type: "string" },
            gender: {
              type: "string",
              enum: ["male", "female"],
            },
            dateOfBirth: { type: "string", format: "date" },
            role: {
              type: "string",
              enum: ["principal", "teacher", "staff", "student"],
            },
            profilePicture: { type: "string", nullable: true },
            status: {
              type: "string",
              enum: ["active", "inactive"],
              default: "active",
            },
            lastLogin: { type: "string", format: "date-time", nullable: true },
            email: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        RegisterInput: {
          type: "object",
          required: [
            "title",
            "firstName",
            "lastName",
            "gender",
            "dateOfBirth",
            "role",
            "email",
            "password",
          ],
          properties: {
            title: {
              type: "string",
              enum: ["mr", "mrs", "miss", "ms"],
              example: "mr",
            },
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            gender: {
              type: "string",
              enum: ["male", "female"],
              example: "male",
            },
            dateOfBirth: {
              type: "string",
              format: "date",
              example: "1990-01-01",
            },
            role: {
              type: "string",
              enum: ["principal", "teacher", "staff", "student"],
              example: "teacher",
            },
            profilePicture: {
              type: "string",
              example: "https://example.com/pic.jpg",
              nullable: true,
            },
            email: { type: "string", example: "john.doe@example.com" },
            password: { type: "string", example: "securepassword123" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john.doe@example.com" },
            password: { type: "string", example: "securepassword123" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            token: { type: "string", description: "JWT Access Token" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "success" },
            token: { type: "string", description: "JWT Access Token" },
            user: {
              type: "object",
              properties: {
                email: { type: "string", example: "john.doe@example.com" },
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        BadRequest: {
          description: "Bad Request - Invalid input parameters",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Validation failed or invalid data",
                  },
                },
              },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized - Missing or invalid token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Unauthorized: Invalid token",
                  },
                },
              },
            },
          },
        },
        Forbidden: {
          description: "Forbidden - Insufficient privileges",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    example: "Forbidden: Insufficient privileges",
                  },
                },
              },
            },
          },
        },
        NotFound: {
          description: "Not Found - The requested resource does not exist",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string", example: "Route not found" },
                },
              },
            },
          },
        },
        InternalServerError: {
          description:
            "Internal Server Error - Something went wrong on the server",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string", example: "Internal Server Error" },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Look for Swagger comments in route files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger docs available at /api-docs");
};
