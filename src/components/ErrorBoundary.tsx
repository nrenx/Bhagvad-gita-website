'use client';

import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch React errors gracefully
 * Provides a fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can send to analytics service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 text-center leading-relaxed">
                We encountered an unexpected error while displaying this content. 
                Our team has been notified and we're working to resolve the issue.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-xs font-mono text-red-800 break-all">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                If this problem persists, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
