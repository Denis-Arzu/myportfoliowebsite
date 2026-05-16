declare module 'resend' {
  export class Resend {
    constructor(apiKey: string);
    emails: {
      send: (params: {
        from: string;
        to: string | string[];
        subject: string;
        html: string;
        replyTo?: string;
        attachments?: Array<{
          filename: string;
          content: Buffer | string;
        }>;
      }) => Promise<{ id: string; error?: { message: string } }>;
    };
  }
}


declare module 'aceternity-ui' {
  export const Vortex: any;
  export const SplashCursor: any;
  export const TrueFocus: any;
  export const DecryptedText: any;
  export const ShinyText: any;
  export const Magnetic: any;
}

declare module 'clsx' {
  type ClassValue = string | number | boolean | undefined | null | ClassValue[];
  export function clsx(...inputs: ClassValue[]): string;
  export type { ClassValue };
}

declare module 'tailwind-merge' {
  export function twMerge(...classLists: string[]): string;
}

declare module 'sharp' {
  interface Sharp {
    resize(options?: { width?: number; height?: number; fit?: string; withoutEnlargement?: boolean }): Sharp;
    webp(options?: { quality?: number; effort?: number }): Sharp;
    metadata(): Promise<{ width?: number; height?: number; format?: string }>;
    toFile(outputPath: string): Promise<void>;
  }
  function sharp(inputPath: string): Sharp;
  export = sharp;
}
