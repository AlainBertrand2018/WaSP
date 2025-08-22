
-- Add a UNIQUE constraint to the 'name' column in the 'products' table.
-- This is necessary for the "ON CONFLICT (name)" clause to work when seeding data.

ALTER TABLE products
ADD CONSTRAINT products_name_unique UNIQUE (name);
