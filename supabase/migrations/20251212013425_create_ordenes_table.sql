/*
  # Create ordenes (orders) table

  1. New Tables
    - `ordenes`
      - `id` (uuid, primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `metodo_pago` (text)
      - `email` (text)
      - `nombre` (text)
      - `apellido` (text)
      - `provincia` (text)
      - `direccion` (text)
      - `total` (decimal)
      - `estado` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ordenes` table
    - Add policy for authenticated users to read their own orders
    - Add policy for authenticated users to create orders
*/

CREATE TABLE IF NOT EXISTS ordenes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  metodo_pago text NOT NULL,
  email text NOT NULL,
  nombre text NOT NULL,
  apellido text NOT NULL,
  provincia text NOT NULL,
  direccion text NOT NULL,
  total decimal(10, 2) NOT NULL CHECK (total >= 0),
  estado text DEFAULT 'pendiente',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ordenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes can read own orders"
  ON ordenes
  FOR SELECT
  TO authenticated
  USING (cliente_id = (SELECT id FROM clientes WHERE user_id = auth.uid()));

CREATE POLICY "Clientes can create orders"
  ON ordenes
  FOR INSERT
  TO authenticated
  WITH CHECK (cliente_id = (SELECT id FROM clientes WHERE user_id = auth.uid()));
