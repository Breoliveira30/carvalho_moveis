-- Script completo para configurar o storage do Supabase
-- Execute este script no SQL Editor do Supabase

-- 1. Criar o bucket se não existir
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images', 
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

-- 2. Remover todas as políticas existentes
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- 3. Criar políticas mais permissivas para o bucket product-images
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Allow public upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- 4. Verificar se tudo foi criado corretamente
SELECT 
  id, 
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'product-images';

-- 5. Testar se as políticas foram aplicadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';
