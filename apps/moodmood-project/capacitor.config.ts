import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cpkku.ionic.moodmood',
  appName: 'moodmood-project',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      '*.firebaseapp.com',
      '*.googleapis.com',
      '*.firebase.google.com',
      '*.openweathermap.org'
    ]
  }
};

export default config;