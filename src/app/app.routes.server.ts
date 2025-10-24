import { RenderMode, ServerRoute } from '@angular/ssr';
import serviceDynamicJson from './routes/service/service-dynamic.json';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'service/:category',
    getPrerenderParams: async () => {
      return Object.keys(serviceDynamicJson).map(category => ({ category }));
    },
    renderMode: RenderMode.Prerender
  }
];
