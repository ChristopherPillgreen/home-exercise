import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kineticare',
    short_name: 'Kineticare',
    description: 'Kineticare is an app designed to help users create customized physical therapy exercise programs for rehabilitation and recovery.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#7874AC',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}