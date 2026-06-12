/* Lex — Sidebar rail. Real Lex chrome: wordmark + ANALYTICS PIPELINE,
   grouped nav, footer build stamp. */
function Rail({ active, onNavigate }) {
  const { nav, org } = window.LEX;
  return (
    <aside className="rail">
      <div className="rail__brand" style={{ alignItems: 'flex-start', gap: 11 }}>
        <span className="rail__glyph" style={{ marginTop: 1 }} />
        <div style={{ lineHeight: 1 }}>
          <div className="row" style={{ gap: 5, alignItems: 'baseline' }}>
            <span className="rail__wordmark">Lex</span>
            <span style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', color: 'var(--faint)' }}>v0</span>
          </div>
          <div style={{ font: '600 8.5px/1 var(--font-mono)', letterSpacing: '0.16em', color: 'var(--faint)', marginTop: 6, textTransform: 'uppercase' }}>Analytics Pipeline</div>
        </div>
      </div>

      <nav className="rail__nav">
        {nav.map((section) => (
          <div key={section.group}>
            <div className="rail__group">{section.group}</div>
            {section.items.map((item) => {
              const isActive = item.id === active;
              return (
                <div
                  key={item.id}
                  className={'rail__item' + (isActive ? ' rail__item--active' : '')}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon name={item.icon} size={16} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.count != null && (
                    <span style={{
                      font: '600 10px/1 var(--font-mono)', letterSpacing: '0.04em',
                      color: isActive ? 'var(--past-blue-ink)' : 'var(--faint)',
                    }}>{item.count}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="rail__footer">
        <div className="row" style={{ gap: 10 }}>
          <span className="avatar avatar--sm" style={{ borderRadius: 8, width: 26, height: 26, background: 'var(--past-mint)', color: 'var(--past-mint-ink)' }}>{window.LEX.user.initials}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '600 12px/1.2 var(--font-display)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{window.LEX.user.name}</div>
            <div style={{ font: '500 10px/1.3 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)' }}>{window.LEX.user.role}</div>
          </div>
          <Icon name="chevronDown" size={14} style={{ color: 'var(--faint)' }} />
        </div>
        <div style={{ font: '500 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', color: 'var(--faint)', paddingTop: 4 }}>
          L.E.X. · {org.version} · {org.env}
        </div>
      </div>
    </aside>
  );
}
window.Rail = Rail;
