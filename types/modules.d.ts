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
      }) => Promise<{ id: string; error?: { message: string } }>;
    };
  }
}

declare module '@react-bits/LightRays-JS-CSS' {
  import { FC, CSSProperties } from 'react';
  interface LightRaysProps {
    raysOrigin?: 'top-center' | 'top-left' | 'top-right' | 'center';
    raysColor?: string;
    raysSpeed?: number;
    lightSpread?: number;
    rayLength?: number;
    pulsating?: boolean;
    fadeDistance?: number;
    saturation?: number;
    followMouse?: boolean;
    mouseInfluence?: number;
    noiseAmount?: number;
    distortion?: number;
  }
  export const LightRays: FC<LightRaysProps>;
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
