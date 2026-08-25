import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message || 'WebGL Context could not be initialized.',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering fallback active:', error?.message || error, errorInfo);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1F0702] to-[#120300] text-amber-200 rounded-2xl border border-orange-500/30">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center mb-3 text-amber-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h4 className="font-playfair text-base font-bold text-amber-100 mb-1">
            {this.props.title || 'Vedic Visual Engine'}
          </h4>
          <p className="text-xs text-amber-200/80 max-w-sm mb-4 leading-relaxed">
            Rendering in high-fidelity compatibility mode for your browser and display configuration.
          </p>
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-orange-950/80 border border-orange-500/40 text-amber-200 hover:bg-orange-900/90 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Celestial View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
