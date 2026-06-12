/* Lex prototype — Deliverables + Verify Results sections of the job page. */

const FILE_META = {
  sql:  { label: 'SQL', color: 'var(--past-blue-ink)', bg: 'var(--past-blue)' },
  html: { label: 'HTML', color: 'var(--past-peach-ink)', bg: 'var(--past-peach)' },
  xlsx: { label: 'XLSX', color: 'var(--past-mint-ink)', bg: 'var(--past-mint)' },
  py:   { label: 'PY', color: 'var(--past-lilac-ink)', bg: 'var(--past-lilac)' },
};

function FileGlyph({ type, size = 38 }) {
  const m = FILE_META[type] || FILE_META.sql;
  return (
    <span style={{ width: size, height: size, borderRadius: 9, background: m.bg, color: m.color, flex: '0 0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 ${size > 30 ? 10 : 9}px/1 var(--font-mono)`, letterSpacing: '0.04em' }}>
      {m.label}
    </span>
  );
}

function HtmlPreview() {
  const tiers = [['Enterprise', 88, 'var(--plum)'], ['Growth', 64, 'var(--grape-2)'], ['Starter', 41, 'var(--amber)'], ['Free', 23, 'var(--past-sky-ink)']];
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden', background: 'var(--surface)' }}>
      <div className="row" style={{ gap: 6, padding: '9px 12px', borderBottom: '1px solid var(--hairline)', background: 'var(--bg-2)' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--hairline-2)' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--hairline-2)' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--hairline-2)' }} />
        <span style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)', marginLeft: 8 }}>wau_by_tier_dashboard.html</span>
      </div>
      <div style={{ padding: 22 }}>
        <div style={{ font: '600 10px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>WEEKLY ACTIVE USERS · BY PLAN TIER</div>
        <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 18 }}>ISO week 2026-W23</div>
        <div className="stack" style={{ gap: 12 }}>
          {tiers.map(([t, w, c]) => (
            <div key={t} className="row" style={{ gap: 12 }}>
              <span style={{ width: 78, fontSize: 12, color: 'var(--ink-2)' }}>{t}</span>
              <div style={{ flex: 1, height: 18, background: 'var(--bg-2)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ width: w + '%', height: '100%', background: c, borderRadius: 5 }} />
              </div>
              <span style={{ width: 44, textAlign: 'right', font: '600 11px/1 var(--font-mono)', color: 'var(--ink)' }}>{(w * 134).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Deliverables({ job }) {
  const { deliverables } = window.LEX;
  const [open, setOpen] = useState(null); // 'sql' | 'html'
  const cloud = `s3://lex-deliverables/${job.slug}/${job.head}/`;

  const dl = (
    <Btn variant="primary" onClick={(e) => { e.stopPropagation(); }}>
      <Icon name="download" size={14} />Download .zip
    </Btn>
  );

  return (
    <Section icon="folder" title="Deliverables" right={dl}
      status={<span className="row" style={{ gap: 6, font: '500 10px/1 var(--font-mono)', color: 'var(--faint)' }}><Icon name="cloud" size={12} />2 files · 92 KB</span>}>
      <div className="row" style={{ gap: 8, marginBottom: 16, font: '500 10.5px/1.4 var(--font-mono)', color: 'var(--faint)', flexWrap: 'wrap' }}>
        <Icon name="cloud" size={13} /><span style={{ color: 'var(--muted)' }}>{cloud}</span>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
        {deliverables.map(d => {
          const m = FILE_META[d.type];
          const active = open === d.id;
          const clickable = !d.future;
          return (
            <div key={d.id} onClick={clickable ? () => setOpen(active ? null : d.id) : undefined}
              style={{ display: 'flex', gap: 13, padding: '14px 15px', borderRadius: 10, alignItems: 'center',
                border: `1px solid ${active ? 'var(--plum)' : 'var(--hairline)'}`,
                background: active ? 'var(--plum-soft)' : d.future ? 'var(--bg-2)' : 'var(--surface)',
                cursor: clickable ? 'pointer' : 'default', opacity: d.future ? 0.7 : 1,
                boxShadow: active ? '0 0 0 3px var(--plum-soft)' : 'none', transition: 'border-color 180ms, box-shadow 180ms' }}>
              <FileGlyph type={d.type} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                <div style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 6 }}>
                  {d.future ? 'Available when added to the job' : `${d.size} · built ${d.built}`}
                </div>
              </div>
              {d.future
                ? <Badge>SOON</Badge>
                : <Icon name={active ? 'chevronDown' : 'eye'} size={15} style={{ color: active ? 'var(--plum)' : 'var(--faint)' }} />}
            </div>
          );
        })}
      </div>

      {open && (
        <div style={{ marginTop: 16, animation: 'fade-up 200ms var(--ease-out)' }}>
          {open === 'sql' ? (
            <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
              <div className="row" style={{ justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-2)', borderBottom: '1px solid var(--hairline)' }}>
                <span className="row" style={{ gap: 8, font: '500 11px/1 var(--font-mono)', color: 'var(--muted)' }}><Icon name="code" size={13} />weekly_active_users_plan_tier.sql</span>
                <button className="btn-icon" title="Copy"><Icon name="copy" size={14} /></button>
              </div>
              <pre style={{ margin: 0, padding: '16px 18px', overflow: 'auto', maxHeight: 320, background: 'var(--surface)',
                font: '12px/1.7 var(--font-mono)', color: 'var(--ink-2)' }}>{window.LEX.deliverables[0].preview}</pre>
            </div>
          ) : <HtmlPreview />}
        </div>
      )}
    </Section>
  );
}
window.Deliverables = Deliverables;

function VerifyRow({ t }) {
  const [open, setOpen] = useState(false);
  const meta = t.result === 'pass' ? ['checkCircle', 'var(--success)', 'PASS']
    : t.result === 'warn' ? ['alert', 'var(--warning)', 'ADVISORY']
    : ['xCircle', 'var(--danger)', 'FAIL'];
  return (
    <div style={{ borderTop: '1px solid var(--hairline)' }}>
      <div className="row" onClick={() => setOpen(o => !o)}
        style={{ gap: 12, padding: '12px 4px', cursor: 'pointer', justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 11, minWidth: 0 }}>
          <Icon name={meta[0]} size={16} style={{ color: meta[1] }} />
          <span style={{ font: '500 12px/1.4 var(--font-mono)', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: open ? 'normal' : 'nowrap' }}>{t.id}</span>
        </div>
        <div className="row" style={{ gap: 10, flex: '0 0 auto' }}>
          <span style={{ font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', color: meta[1] }}>{meta[2]}</span>
          <Icon name={open ? 'chevronDown' : 'chevronRight'} size={14} style={{ color: 'var(--faint)' }} />
        </div>
      </div>
      {open && (
        <div style={{ padding: '2px 4px 16px 39px', animation: 'fade-in 160ms' }}>
          <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 720 }}>{t.detail}</p>
        </div>
      )}
    </div>
  );
}

function VerifyResults() {
  const { verify } = window.LEX;
  const pass = verify.filter(t => t.result === 'pass').length;
  const warn = verify.filter(t => t.result === 'warn').length;
  const fail = verify.filter(t => t.result === 'fail').length;
  const overall = fail ? ['danger', 'FAIL'] : ['success', 'PASS'];
  return (
    <Section icon="checkCircle" title="Verify results"
      status={<Spill variant={overall[0]} filled>{overall[1]}</Spill>}
      right={<span style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)' }}>{pass} passed{warn ? ` · ${warn} advisory` : ''}{fail ? ` · ${fail} failed` : ''}</span>}>
      <div style={{ marginTop: -4 }}>
        {verify.map(t => <VerifyRow key={t.id} t={t} />)}
      </div>
    </Section>
  );
}
window.VerifyResults = VerifyResults;
