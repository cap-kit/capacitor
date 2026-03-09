import 'xml2js';

declare module 'xml2js' {
  interface BuilderOptions {
    explicitRoot?: boolean;
  }
}
