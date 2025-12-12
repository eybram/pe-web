/*
  # Create productos (products) table

  1. New Tables
    - `productos`
      - `id` (text, primary key)
      - `nombre_producto` (text)
      - `categoria` (text)
      - `franquicia` (text)
      - `precio` (decimal)
      - `stock` (integer)
      - `image` (text)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `productos` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS productos (
  id text PRIMARY KEY,
  nombre_producto text NOT NULL,
  categoria text NOT NULL,
  franquicia text,
  precio decimal(10, 2) NOT NULL CHECK (precio >= 0),
  stock integer DEFAULT 0 CHECK (stock >= 0),
  image text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read productos"
  ON productos
  FOR SELECT
  TO public
  USING (true);
