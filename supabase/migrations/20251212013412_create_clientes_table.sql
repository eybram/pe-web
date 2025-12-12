/*
  # Create clientes (customers) table

  1. New Tables
    - `clientes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `nombre` (text)
      - `apellido` (text)
      - `cedula` (text, unique)
      - `email` (text, unique)
      - `telefono` (text)
      - `provincia` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `clientes` table
    - Add policy for authenticated users to read/update their own profile
*/

CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre text NOT NULL,
  apellido text NOT NULL,
  cedula text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  telefono text,
  provincia text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes can read own profile"
  ON clientes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Clientes can update own profile"
  ON clientes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clientes can insert own profile"
  ON clientes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
