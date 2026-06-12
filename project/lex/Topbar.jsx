/* Lex — Topbar. Translucent + blur. Breadcrumb + live sync + search. */
function Topbar({ crumbs, onCrumb }) {
  const { user } = window.LEX;
  const [syncing, setSyncing] = React.useState(false);
  const sync = () => { setSyncing(true); setTimeout(() => setSyncing(false), 1100); };
  return (
    <header className="topbar">
      <div className="row" style={{ gap: 8 }}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <React.Fragment key={i}>
              {i > 0 && <Icon name="chevronRight" size={12} style={{ color: 'var(--faint)' }} />}
              <span
                className="crumb"
                onClick={() => !last && c.to && onCrumb && onCrumb(c.to)}
                style={{ color: last ? 'var(--ink-2)' : 'var(--muted)', cursor: !last && c.to ? 'pointer' : 'default' }}
              >{c.label}</span>
            </React.Fragment>
          );
        })}
      </div>

      <div className="row" style={{ gap: 10 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--faint)', display: 'flex' }}>
            <Icon name="search" size={14} />
          </span>
          <input className="input" placeholder="Search jobs…" style={{ width: 220, paddingLeft: 32, height: 34 }} />
        </div>
        <span className="spill spill--success spill--filled" title="Auto-refresh · last sync 2m ago">
          <span className="spill__dot pulse-dot" />LIVE
        </span>
        <button className="btn-icon" onClick={sync} title="Sync now">
          <Icon name="sync" size={16} style={syncing ? { animation: 'spin 0.7s linear infinite' } : undefined} />
        </button>
        <button className="btn-icon" title="Notifications"><Icon name="bell" size={16} /></button>
        <span className="avatar avatar--sm" title={user.name}>{user.initials}</span>
      </div>
    </header>
  );
}
window.Topbar = Topbar;
