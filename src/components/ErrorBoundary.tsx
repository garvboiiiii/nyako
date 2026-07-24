import { Component, type ReactNode } from "react";
import NyakoMascot from "./NyakoMascot";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-sm text-center">
            <NyakoMascot state="error" size={100} className="mx-auto mb-6" />
            <h1 className="font-display text-xl font-bold mb-2">Something broke</h1>
            <p className="text-text-dim text-sm mb-6">
              An unexpected error happened. Your files were never uploaded anywhere, so nothing is lost — just reload and try again.
            </p>
            <button
              onClick={() => window.location.assign("/")}
              className="font-display text-sm bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:brightness-110 transition focus-ring"
            >
              Back to home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
