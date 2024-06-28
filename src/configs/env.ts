export const isLocal =
  import.meta.env.MODE === 'localhost' || import.meta.env.MODE === 'mock';

// storybook env.MODE 可能會是 development 或 production
export const isDevelopment =
  import.meta.env.MODE === 'develop' || import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';
export const isLocalOrDevelopment = isLocal || isDevelopment;
