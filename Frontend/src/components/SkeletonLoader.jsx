import './SkeletonLoader.css';

export function ProductSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-image" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton-row">
              <div className="skeleton skeleton-price" />
              <div className="skeleton skeleton-btn" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-stat">
          <div className="skeleton skeleton-stat-icon" />
          <div className="skeleton skeleton-stat-number" />
          <div className="skeleton skeleton-stat-label" />
        </div>
      ))}
    </div>
  );
}

export function OrderSkeleton({ count = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-order">
          <div className="skeleton" style={{ width: '60%', height: '20px' }} />
          <div className="skeleton" style={{ width: '40%', height: '16px', marginTop: '8px' }} />
          <div className="skeleton" style={{ width: '80%', height: '16px', marginTop: '8px' }} />
        </div>
      ))}
    </div>
  );
}
