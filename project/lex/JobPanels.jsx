/* Lex — Job page panels: Accordion, CodeBlock, Summary, Contract,
   Deliverables, Verify. Exported to window for Job.jsx. */

function Accordion({ title, meta, badge, defaultOpen, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} className="row"
        style={{ width: '100%', justifyContent: 'space-between', gap: 12, padding: '18px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span className="row" style={{ gap: 11, minWidth: 0 }}>
          <Icon name="chevronRight" size={15} style={{ color: 'var(--faint)', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 220ms var(--ease)' }} />
          <span style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>{title}</span>
          {meta && <span style={{ font: '500 10.5px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--faint)' }}>{meta}</span>}
        </span>
        {badge}
      </button>
      {open && <div style={{ padding: '4px 24px 26px', animation: 'fade-in 200ms var(--ease-out)' }}>{children}</div>}
    </div>
  );
}

const SQL_KW = new Set(['WITH','SELECT','FROM','WHERE','JOIN','LEFT','RIGHT','INNER','CROSS','ON','AND','OR','GROUP','BY','ORDER','AS','DISTINCT','COUNT','COALESCE','INTERVAL','CASE','WHEN','THEN','ELSE','END','NOT','NULL','IS','INTO','UNION','ALL','DESC','ASC','TIMESTAMP']);
const SQL_FN = new Set(['generate_series','date_trunc','CURRENT_DATE','GREATEST','LEAST','COUNT','COALESCE','MAX','MIN','SUM']);

function CodeLine({ text }) {
  const trimmed = text.trimStart();
  if (trimmed.startsWith('--')) {
    return <span style={{ color: 'var(--faint)', fontStyle: 'italic' }}>{text || ' '}</span>;
  }
  const parts = text.split(/(\s+|[(),;]+)/);
  return (
    <span>
      {parts.map((p, i) => {
        const bare = p.replace(/[^A-Za-z_]/g, '');
        if (SQL_KW.has(bare.toUpperCase()) && bare.length > 1 && bare === bare.toUpperCase()) return <span key={i} style={{ color: 'var(--plum)', fontWeight: 600 }}>{p}</span>;
        if (SQL_FN.has(bare)) return <span key={i} style={{ color: 'var(--past-sky-ink)' }}>{p}</span>;
        if (/^\d+$/.test(bare)) return <span key={i} style={{ color: 'var(--past-peach-ink)' }}>{p}</span>;
        if (p.startsWith("'") || /'.*'/.test(p)) return <span key={i} style={{ color: 'var(--success)' }}>{p}</span>;
        return <span key={i} style={{ color: 'var(--ink-2)' }}>{p}</span>;
      })}
    </span>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split('\n');
  const copy = () => { try { navigator.clipboard.writeText(code); } catch (e) {} setCopied(true); setTimeout(() => setCopied(false), 1400); };
  return (
    <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-2)' }}>
      <div className="row" style={{ justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid var(--hairline)', background: 'var(--surface)' }}>
        <span style={{ font: '500 10px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--faint)' }}>{lines.length} lines · SQL</span>
        <button className="btn btn--subtle" onClick={copy} style={{ padding: '4px 9px', fontSize: 11.5 }}>
          <Icon name={copied ? 'check' : 'doc'} size={13} />{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div style={{ overflow: 'auto', maxHeight: 460 }}>
        <pre style={{ margin: 0, padding: '14px 0', font: '12px/1.65 var(--font-mono)' }}>
          {lines.map((ln, i) => (
            <div key={i} className="row" style={{ gap: 0, alignItems: 'flex-start', padding: '0 16px' }}>
              <span style={{ width: 34, flex: '0 0 auto', textAlign: 'right', paddingRight: 16, color: 'var(--faint)', userSelect: 'none', opacity: 0.6 }}>{i + 1}</span>
              <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><CodeLine text={ln} /></code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

/* ---- Summary ---- */
function SummaryPanel({ job }) {
  const total = Object.values(job.phaseCost).reduce((a, b) => a + b, 0);
  const chips = [['amortized seat share', job.seatShare, true], ['marginal', job.marginal], ['list-price ref', job.listRef]];
  return (
    <div>
      <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>{job.summary}</p>
      <div className="row" style={{ gap: 26, marginTop: 20, flexWrap: 'wrap' }}>
        {chips.map(([l, v, big]) => (
          <div key={l}>
            <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>{l}</div>
            <div style={{ font: (big ? '600' : '500') + ' ' + (big ? 22 : 18) + 'px/1 var(--font-display)', letterSpacing: '-0.02em', color: big ? 'var(--ink)' : 'var(--ink-2)', marginTop: 7 }}>{v}</div>
          </div>
        ))}
      </div>
      {total > 0 && (
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--hairline)' }}>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <Eyebrow>Phase breakdown</Eyebrow>
            <div className="row" style={{ gap: 12 }}>
              {Object.entries(job.phaseCost).map(([k, v]) => (
                <span key={k} className="row" style={{ gap: 6, font: '500 10px/1 var(--font-mono)', letterSpacing: '0.04em', color: 'var(--muted)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: LEX_PHASE_COLORS[k] }} />{k} ${v.toFixed(2)}
                </span>
              ))}
            </div>
          </div>
          <PhaseBar cost={job.phaseCost} height={10} />
        </div>
      )}
    </div>
  );
}

/* ---- Contract ---- */
function ContractPanel({ job }) {
  return (
    <div className="stack" style={{ gap: 24 }}>
      <div>
        <Eyebrow style={{ marginBottom: 12 }}>Business questions</Eyebrow>
        <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none', counterReset: 'q' }}>
          {job.questions.map((q, i) => (
            <li key={i} className="row" style={{ gap: 12, alignItems: 'flex-start', padding: '8px 0' }}>
              <span style={{ font: '600 11px/1.4 var(--font-mono)', color: 'var(--plum)', flex: '0 0 auto', width: 18 }}>{i + 1}</span>
              <span style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{q}</span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <Eyebrow style={{ marginBottom: 8 }}>Grain</Eyebrow>
        <p style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{job.grain}</p>
      </div>
      {job.columns.length > 0 && (
        <div>
          <Eyebrow style={{ marginBottom: 12 }}>Requested columns</Eyebrow>
          <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 110px 1fr', gap: 12, padding: '9px 16px', background: 'var(--bg-2)', borderBottom: '1px solid var(--hairline)', font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)' }}>
              <span>Name</span><span>Source</span><span>Description</span>
            </div>
            {job.columns.map((c, i) => (
              <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '180px 110px 1fr', gap: 12, padding: '12px 16px', borderBottom: i < job.columns.length - 1 ? '1px solid var(--hairline)' : 'none', alignItems: 'start' }}>
                <span style={{ font: '500 12px/1.4 var(--font-mono)', color: 'var(--ink)' }}>{c.name}</span>
                <span><span className="badge" style={{ fontSize: 9 }}>{c.source}</span></span>
                <span style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.45 }}>{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <Eyebrow style={{ marginBottom: 10 }}>Sources</Eyebrow>
        <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
          {job.sources.map((s) => <span key={s} style={{ font: '500 11px/1 var(--font-mono)', color: 'var(--ink-2)', padding: '5px 10px', background: 'var(--elevated)', borderRadius: 6 }}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---- Deliverables ---- */
function FileCard({ file, active, onClick }) {
  const ft = LEX_FILETYPE[file.type] || LEX_FILETYPE.sql;
  return (
    <button onClick={onClick} disabled={ft.soon}
      style={{ textAlign: 'left', border: '1px solid ' + (active ? 'var(--plum)' : 'var(--hairline)'), borderRadius: 10, padding: '13px 14px', background: active ? 'var(--plum-soft)' : 'var(--surface)', cursor: ft.soon ? 'not-allowed' : 'pointer', opacity: ft.soon ? 0.55 : 1, boxShadow: active ? '0 0 0 3px var(--plum-soft)' : 'none', transition: 'all 200ms var(--ease-soft)', minWidth: 0 }}>
      <div className="row" style={{ gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: 8, background: ft.tint, color: ft.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 9px/1 var(--font-mono)', flex: '0 0 auto' }}>{ft.label}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
          <div style={{ font: '500 10px/1 var(--font-mono)', color: 'var(--faint)', marginTop: 4 }}>{ft.soon ? 'coming soon' : file.size + (file.primary ? ' · primary' : '')}</div>
        </div>
      </div>
    </button>
  );
}

function DeliverablesPanel({ job }) {
  const primary = job.deliverables.find((d) => d.primary);
  const [sel, setSel] = React.useState(primary ? primary.name : null);
  const future = ['xlsx', 'py'].filter((t) => !job.deliverables.some((d) => d.type === t));
  const selFile = job.deliverables.find((d) => d.name === sel);

  return (
    <div className="stack" style={{ gap: 18 }}>
      <div className="card" style={{ padding: '16px 18px', background: 'var(--bg-2)', border: '1px solid var(--hairline)', boxShadow: 'none' }}>
        <div className="row" style={{ justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div className="row" style={{ gap: 11, minWidth: 0 }}>
            <span style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--plum-soft)', color: 'var(--plum)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}><Icon name="layers" size={18} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{job.deliverables.length} files · {job.version}</div>
              <div style={{ font: '500 10.5px/1.4 var(--font-mono)', color: 'var(--faint)', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={job.cloud}>{job.cloud}</div>
            </div>
          </div>
          <button className="btn btn--primary"><Icon name="download" size={15} />Download .zip</button>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 10 }}>
        {job.deliverables.map((f) => <FileCard key={f.name} file={f} active={sel === f.name && f.type === 'sql'} onClick={() => f.type === 'sql' && setSel(f.name)} />)}
        {future.map((t) => <FileCard key={t} file={{ type: t, name: t === 'xlsx' ? 'export.xlsx' : 'pipeline.py', size: '' }} />)}
      </div>

      {selFile && selFile.type === 'sql' && (
        <div>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
            <Eyebrow>Preview · {selFile.name}</Eyebrow>
            <span style={{ font: '500 10.5px/1 var(--font-mono)', color: 'var(--faint)' }}>Iteration {job.iteration} · {job.ctes} CTEs</span>
          </div>
          <CodeBlock code={job.sql} />
        </div>
      )}
    </div>
  );
}

/* ---- Verify (clean pass/fail list) ---- */
function TestRow({ test, open, onToggle }) {
  const map = {
    pass: { ic: 'check', color: 'var(--success)', bg: 'var(--past-mint)', label: 'PASS' },
    fail: { ic: 'x', color: 'var(--danger)', bg: 'var(--danger-soft)', label: 'FAIL' },
    warn: { ic: 'flag', color: 'var(--warning)', bg: 'var(--warning-soft)', label: 'WARN' },
  };
  const m = map[test.result];
  return (
    <div style={{ borderBottom: '1px solid var(--hairline)' }}>
      <button onClick={onToggle} className="row" style={{ width: '100%', gap: 12, padding: '13px 18px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ width: 20, height: 20, borderRadius: 6, background: m.bg, color: m.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}><Icon name={m.ic} size={12} stroke={2.2} /></span>
        <span style={{ flex: 1, font: '500 12.5px/1.4 var(--font-mono)', color: 'var(--ink)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{test.name}</span>
        <span style={{ font: '600 9.5px/1 var(--font-mono)', letterSpacing: '0.08em', color: m.color }}>{m.label}</span>
        <Icon name="chevronDown" size={14} style={{ color: 'var(--faint)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms var(--ease)' }} />
      </button>
      {open && (
        <div style={{ padding: '0 18px 16px 50px', animation: 'fade-in 180ms var(--ease-out)' }}>
          <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6 }}>{test.detail}</p>
        </div>
      )}
    </div>
  );
}

function VerifyPanel({ job }) {
  const [open, setOpen] = React.useState({});
  const pass = job.tests.filter((t) => t.result === 'pass').length;
  const fail = job.tests.filter((t) => t.result === 'fail').length;
  const warn = job.tests.filter((t) => t.result === 'warn').length;
  return (
    <div>
      <div className="row" style={{ gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['passed', pass, 'var(--success)', 'var(--past-mint)'], ['failed', fail, 'var(--danger)', 'var(--danger-soft)'], ['warnings', warn, 'var(--warning)', 'var(--warning-soft)']].map(([l, n, c, bg]) => (
          <div key={l} className="row" style={{ gap: 9, padding: '8px 14px', borderRadius: 8, background: n ? bg : 'var(--elevated)' }}>
            <span style={{ font: '600 18px/1 var(--font-display)', color: n ? c : 'var(--faint)' }}>{n}</span>
            <span style={{ font: '600 9.5px/1.3 var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', color: n ? c : 'var(--faint)' }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
        {job.tests.map((t, i) => <TestRow key={t.name} test={t} open={!!open[i]} onToggle={() => setOpen({ ...open, [i]: !open[i] })} />)}
      </div>
    </div>
  );
}

Object.assign(window, { Accordion, CodeBlock, SummaryPanel, ContractPanel, DeliverablesPanel, VerifyPanel });
