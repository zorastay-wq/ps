// Safe WebGL Detection Utility

let isWebGLSupportedCached: boolean | null = null;

export function isWebGLAvailable(): boolean {
  if (isWebGLSupportedCached !== null) {
    return isWebGLSupportedCached;
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    isWebGLSupportedCached = false;
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');

    isWebGLSupportedCached = Boolean(gl && gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext));
    
    // Clean up context if possible
    if (gl) {
      const loseContext = (gl as any).getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
    }
  } catch {
    isWebGLSupportedCached = false;
  }

  return isWebGLSupportedCached;
}
