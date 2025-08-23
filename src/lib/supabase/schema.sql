-- Enable the pgvector extension to work with vector embeddings
create extension if not exists vector;

-- Create a table to store the constitution sections and their embeddings
create table constitution_sections (
  id bigserial primary key,
  content text,
  tokens bigint,
  embedding vector (768) -- Corresponds to the dimensionality of text-embedding-004
);
