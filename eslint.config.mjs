import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/build/**',
      '**/dist/**',
      '**/types/**',
      'cli/assets/**',
      'android/capacitor/src/main/assets/native-bridge.js',
      'ios/Capacitor/Capacitor/assets/native-bridge.js',
      'ios/Frameworks/**',
      '**/capacitor-cordova-android-plugins/**',
      '**/capacitor-cordova-ios-plugins/**',
      '**/scripts/lib/**',
      'official-dist/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      'no-console': 'off',
      'import/no-unresolved': 'off',
      'no-unused-labels': 'off',
      'no-useless-escape': 'off',
      'no-case-declarations': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      'no-prototype-builtins': 'off',
      'no-redeclare': 'off',
      'valid-typeof': 'off',
      'no-useless-assignment': 'off',
      'preserve-caught-error': 'off',
      'getter-return': 'off',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],

    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-redeclare': 'off',
      'no-control-regex': 'off',
      'no-empty': 'off',
      'valid-typeof': 'off',
    },
  },
  {
    files: ['**/*.mjs', 'scripts/**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
    },
  },
);
