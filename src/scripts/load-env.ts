/**
 * @fileOverview A pre-loader script to ensure environment variables
 * from the .env file are loaded before any other script logic runs.
 */
import dotenv from 'dotenv';

// Load environment variables from the .env file in the project root.
dotenv.config({ path: '.env' });
