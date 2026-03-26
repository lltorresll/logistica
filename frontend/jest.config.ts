// frontend/jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Ruta a tu app Next.js
  dir: './',
});

const customJestConfig = {
  // Aquí le decimos que busque el setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Esto mapea el alias @/ a la carpeta src/ o la raíz
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(customJestConfig);