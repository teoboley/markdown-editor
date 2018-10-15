
declare module 'unified';

declare module 'remark-parse';
declare module 'rehype-stringify';
declare module 'remark-rehype';

declare module 'rehype-parse';
declare module 'remark-stringify';
declare module 'rehype-remark';

declare module 'slate-html-serializer';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;