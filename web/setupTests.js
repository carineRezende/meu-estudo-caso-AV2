// web/setupTests.js
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'; // Essencial para o "to be in the document" etc.
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});