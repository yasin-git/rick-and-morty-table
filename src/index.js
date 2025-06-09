import React from 'react'; // React kütüphanesini içe aktar
import ReactDOM from 'react-dom/client'; // React DOM işlemleri için istemci tarafı kütüphanesi
import App from './App'; // Ana uygulama bileşeni
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'; // React Query kütüphanesi

// Yeni bir QueryClient örneği oluştur
const queryClient = new QueryClient();

// Uygulamayı DOM'a render et
ReactDOM.createRoot(document.getElementById('root')).render(
  // React Query ile veri yönetimi için QueryClientProvider ile sar
  <QueryClientProvider client={queryClient}>
    <App /> {/* Ana uygulama bileşenini çağır */}
  </QueryClientProvider>
);
