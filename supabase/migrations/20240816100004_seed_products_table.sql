-- Seed the products table with the defined subscription plans

INSERT INTO public.products (active, name, description, metadata)
VALUES
(
  true,
  'Test Drive',
  'For entrepreneurs and business owners who want to get a feel of BusinessStudio. Includes 1 business project and 1 seat. No reporting or document downloads.',
  '{"price": 0, "currency": "MUR", "interval": "once", "usage_type": "licensed"}'
),
(
  true,
  'Business Tool Kit',
  'For entrepreneurs and startups who need specific tools to operate smartly. Access to one re-usable tool for up to 5 seats. Includes reporting and PDF downloads.',
  '{"price": 200, "currency": "MUR", "interval": "month", "usage_type": "licensed"}'
),
(
  true,
  'PRO',
  'For serious Business Owners, Executives, and team members. Includes unlimited business idea validations, the full Business Creation Suite, Financial Planning Tools, and advanced reporting for up to 4 seats.',
  '{"price": 400, "currency": "MUR", "interval": "month", "usage_type": "licensed"}'
),
(
  true,
  'AI Transformation Blueprints',
  'For established companies and agencies seeking to implement reliable AI-driven tools, protocols, and workflows in-house. Includes training, support, and custom integrations.',
  '{"price": "custom", "currency": "MUR", "interval": "once", "usage_type": "licensed"}'
)
ON CONFLICT (name) DO NOTHING; -- This ensures that if the products already exist, it will not cause an error.
