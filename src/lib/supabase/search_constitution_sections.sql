-- Create a function to search for constitution sections
create or replace function search_constitution_sections (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    constitution_sections.id,
    constitution_sections.content,
    1 - (constitution_sections.embedding <=> query_embedding) as similarity
  from constitution_sections
  where 1 - (constitution_sections.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
