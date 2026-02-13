
-- Update existing columns to be nullable
ALTER TABLE cards ALTER COLUMN nome DROP NOT NULL;
ALTER TABLE cards ALTER COLUMN cognome DROP NOT NULL;
ALTER TABLE cards ALTER COLUMN email DROP NOT NULL;
ALTER TABLE cards ALTER COLUMN link_tessera DROP NOT NULL;

-- Add new columns
ALTER TABLE cards ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE cards ADD COLUMN IF NOT EXISTS eta integer;
ALTER TABLE cards ADD COLUMN IF NOT EXISTS genere text;

-- Update existing records to be 'active'
UPDATE cards SET status = 'active' WHERE status IS NULL;
