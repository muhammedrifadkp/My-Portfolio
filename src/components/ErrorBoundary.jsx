import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            Something went wrong
          </h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', maxWidth: '600px' }}>
            A rendering issue occurred. Details below:
          </p>
          {this.state.error && (
            <pre style={{
              background: 'rgba(255,0,0,0.1)',
              border: '1px solid rgba(255,0,0,0.3)',
              color: '#ff6b6b',
              padding: '1rem',
              borderRadius: '8px',
              maxWidth: '800px',
              width: '100%',
              overflowX: 'auto',
              textAlign: 'left',
              marginBottom: '1.5rem',
              fontSize: '0.85rem'
            }}>
              {this.state.error.toString()}
              {"\n\n"}
              {this.state.error.stack}
            </pre>
          )}
          <button
            onClick={this.handleReload}
            style={{
              padding: '12px 30px',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #00F0FF, #7000FF)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
