declare module 'unified' {
  function processor(): any;
  export default {
    default: processor
  };
}

declare module 'remark-parse';
declare module 'rehype-stringify';
declare module 'remark-rehype';

declare module 'rehype-parse';
declare module 'remark-stringify';
declare module 'rehype-remark';

declare module 'slate-html-serializer';
