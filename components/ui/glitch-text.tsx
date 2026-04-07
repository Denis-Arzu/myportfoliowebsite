import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  className?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

export const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  className = ''
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-2px 0 rgba(255, 0, 80, 0.6)' : 'none',
    '--before-shadow': enableShadows ? '2px 0 rgba(0, 255, 255, 0.6)' : 'none'
  };

  return (
    <span className={`glitch ${className}`} style={inlineStyles} data-text={children}>
      {children}
    </span>
  );
};

export default GlitchText;
