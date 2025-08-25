-- Desabilitar RLS temporariamente para configuração (apenas para admin)
-- Este script deve ser executado como superusuário no Supabase

-- Criar bucket para imagens de produtos (com privilégios administrativos)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'product-images', 
  'product-images', 
  true, 
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- Política para permitir visualização pública das imagens
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Política para permitir upload de imagens (público)
CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- Política para permitir atualização de imagens
CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- Política para permitir deletar imagens
CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

-- Verificar se o bucket foi criado
SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'product-images';
