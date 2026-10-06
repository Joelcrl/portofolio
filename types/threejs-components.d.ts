// The package ships no types. Only the parts used by
// components/ui/tubes-cursor.tsx are declared here.
declare module "threejs-components/build/cursors/tubes1.min.js" {
  export type TubesCursorOptions = {
    tubes?: {
      colors?: string[];
      lights?: { intensity?: number; colors?: string[] };
    };
  };

  export type TubesCursorApp = {
    three: {
      minPixelRatio: number;
      maxPixelRatio: number;
      resize: () => void;
    };
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
    dispose: () => void;
  };

  export default function TubesCursor(
    canvas: HTMLCanvasElement,
    options?: TubesCursorOptions,
  ): TubesCursorApp;
}
