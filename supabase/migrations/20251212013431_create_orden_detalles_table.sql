/*
  # Create orden_detalles (order items) table

  1. New Tables
    - `orden_detalles`
      - `id` (uuid, primary key)
      - `orden_id` (uuid, foreign key to ordenes)
      - `producto_id` (text, foreign key to productos)
      - `cantidad` (integer)
      - `precio_unitario` (decimal)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `orden_detalles` table
    - Add policy for authenticated users to read order items from their own orders
*/

CREATE TABLE IF NOT EXISTS orden_detalles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  orden_id uuid REFERENCES ordenes(id) ON DELETE CASCADE NOT NULL,
  producto_id text REFERENCES productos(id) ON DELETE RESTRICT NOT NULL,
  cantidad integer NOT NULL CHECK (cantidad > 0),
  precio_unitario decimal(10, 2) NOT NULL CHECK (precio_unitario >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orden_detalles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clientes can read order items from own orders"
  ON orden_detalles
  FOR SELECT
  TO authenticated
  USING (
    orden_id IN (
      SELECT id FROM ordenes
      WHERE cliente_id = (SELECT id FROM clientes WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Clientes can insert order items"
  ON orden_detalles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    orden_id IN (
      SELECT id FROM ordenes
      WHERE cliente_id = (SELECT id FROM clientes WHERE user_id = auth.uid())
    )
  );
