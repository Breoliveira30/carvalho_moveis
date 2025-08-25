-- Script 3: Configurar storage para imagens
-- Execute este script após configurar a segurança

-- 1. REMOVER BUCKET EXISTENTE SE HOUVER PROBLEMAS
DELETE FROM storage.objects WHERE bucket_id = 'product-images';
DELETE FROM storage.buckets WHERE id = 'product-images';

-- 2. CRIAR BUCKET PARA IMAGENS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images', 
  true,
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
);

-- 3. LIMPAR POLÍTICAS DE STORAGE ANTIGAS
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access on storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow public upload on storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update on storage" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete on storage" ON storage.objects;

-- 4. CRIAR POLÍTICAS DE STORAGE
CREATE POLICY "Allow public read access on storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Allow public upload on storage" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public update on storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public delete on storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');

-- 5. VERIFICAR BUCKET CRIADO
SELECT 'Storage configurado com sucesso!' as status;
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'product-images';
