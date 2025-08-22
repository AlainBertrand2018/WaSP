-- Safely add the 'role' column to the profiles table if it doesn't exist.
DO $$
BEGIN
  IF NOT EXISTS(SELECT *
    FROM information_schema.columns
    WHERE table_name='profiles' and column_name='role')
  THEN
    ALTER TABLE "public"."profiles"
    ADD COLUMN "role" text;
  END IF;
END $$;

-- Create the subscriptions table if it doesn't exist.
CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "plan_id" text,
    "status" text,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "current_period_start" timestamp with time zone,
    "current_period_end" timestamp with time zone
);

ALTER TABLE "public"."subscriptions" OWNER TO "postgres";

-- Add comments for clarity.
COMMENT ON TABLE "public"."subscriptions" IS 'Manages user subscriptions to various plans or apps.';

-- Create the primary key for the subscriptions table.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'subscriptions_pkey'
    ) THEN
        ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY (id);
    END IF;
END$$;


-- Add foreign key constraint to link subscriptions to users.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'subscriptions_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END$$;
