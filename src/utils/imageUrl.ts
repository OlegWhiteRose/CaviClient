import { DEST_IMG, IS_TAURI } from '@/config/target_config';

/**
 * Преобразует URL изображения из MinIO для работы в разных режимах:
 * - Tauri: использует прямой URL к localhost:9000
 * - Dev браузер: использует Vite proxy /img-proxy/
 * - GH Pages: использует локальный Vite proxy
 */
export const getProxiedImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  
  // Паттерн для MinIO URL (localhost или любой IP на порту 9000)
  const minioPattern = /^https?:\/\/[^/]+:9000(\/.*)/;
  const match = url.match(minioPattern);
  
  if (match) {
    const path = match[1]; // /cavi-images/diagrams/1.jpg
    
    if (IS_TAURI) {
      // Tauri: прямой доступ к localhost MinIO
      return `${DEST_IMG}${path}`;
    }
    
    // Браузер: через Vite proxy
    // DEST_IMG пустой для dev, или https://IP:3000 для GH Pages
    return `${DEST_IMG}/img-proxy${path}`;
  }
  
  return url;
};
