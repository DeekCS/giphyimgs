import React, {Component, ReactNode} from 'react';
import ErrorFallback from './ErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  resetErrorBoundary = () => {
    this.setState({hasError: false, error: null});
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
