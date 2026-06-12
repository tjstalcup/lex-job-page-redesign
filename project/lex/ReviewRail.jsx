/* Lex prototype — Review rail. Combines the old Analyst Feedback,
   Submit Review, and Review History into ONE stream: a verdict head,
   grade + decision controls, a threaded timeline, and a composer. */

const GRADES = [
  ['good', 'Good', 'I measured value from this tool.', 'var(--success)'],
  ['neutral', 'Neutral', 'Some utility, but marginal.', 'var(--muted)'],
  ['bad', 'Bad', "I don't want this deliverable.", 'var(--danger)'],
];

function ThreadItem({ item }) {
  let icon, color, head;
  if (item.kind === 'verify') { icon = 'checkCircle'; color = 'var(--success)'; head = 'Verify suite'; }
  else if (item.kind === 'grade') { icon = 'thumbsUp'; color = gradeColor(item.grade); head = item.who; }
  else if (item.kind === 'decision') { icon = item.decision === 'approved' ? 'check' : 'x'; color = item.decision === 'approved' ? 'var(--success)' : 'var(--danger)'; head = item.who; }
  else { icon = null; color = 'var(--plum)'; head = item.who; }

  return (
    <div className="row" style={{ gap: 11, alignItems: 'flex-start' }}>
      {icon
        ? <span style={{ width: 26, height: 26, borderRadius: 8, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-2)', color }}><Icon name={icon} size={14} /></span>
        : <span className="avatar avatar--sm" style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--past-blue)', color: 'var(--past-blue-ink)', fontSize: 10 }}>{item.who.split(' ').map(w => w[0]).join('').slice(0, 2)}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="row" style={{ gap: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)' }}>{head}</span>
          {item.role && <span style={{ font: '500 9px/1 var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--faint)' }}>{item.role}</span>}
          {item.kind === 'grade' && <span className="spill spill--filled" style={{ color: gradeColor(item.grade), background: item.grade === 'good' ? 'var(--past-mint)' : 'var(--elevated)' }}>{item.grade}</span>}
          {item.kind === 'decision' && <span className="spill spill--filled spill--success">{item.decision}</span>}
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5, marginTop: 5 }}>{item.body}</p>
        <div style={{ font: '500 9px/1 var(--font-mono)', letterSpacing: '0.06em', color: 'var(--faint)', marginTop: 6 }}>{item.when}</div>
      </div>
    </div>
  );
}

function ReviewRail({ job }) {
  const [grade, setGrade] = useState(job.grade || 'good');
  const [decision, setDecision] = useState('approve');
  const [text, setText] = useState('');
  const [thread, setThread] = useState(window.LEX.reviewThread);
  const [name] = useState('Jane Smith');

  const post = (kind) => {
    const now = 'Jun 10, 9:1' + Math.floor(Math.random() * 9) + ' AM';
    if (kind === 'comment') {
      if (!text.trim()) return;
      setThread(t => [...t, { id: Date.now(), who: name, role: 'Reviewer', kind: 'comment', when: now, body: text.trim() }]);
      setText('');
    } else {
      const items = [{ id: Date.now(), who: name, role: 'Reviewer', kind: 'grade', grade, when: now, body: text.trim() || GRADES.find(g => g[0] === grade)[2] }];
      items.push({ id: Date.now() + 1, who: name, role: 'Reviewer', kind: 'decision', decision: decision === 'approve' ? 'approved' : 'rejected', when: now, body: decision === 'approve' ? 'Approved.' : 'Changes requested.' });
      setThread(t => [...t, ...items]);
      setText('');
    }
  };

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="row" style={{ justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--hairline)' }}>
        <div className="row" style={{ gap: 9, color: 'var(--muted)' }}><Icon name="message" size={15} /><span className="label-mono" style={{ margin: 0 }}>Review</span></div>
        <Spill variant="success" filled>APPROVED</Spill>
      </div>

      {/* grade selector */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 11 }}>Grade</div>
        <div className="stack" style={{ gap: 7 }}>
          {GRADES.map(([id, label, desc, col]) => {
            const on = grade === id;
            return (
              <button key={id} onClick={() => setGrade(id)} className="row"
                style={{ gap: 10, padding: '9px 11px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                  border: `1px solid ${on ? col : 'var(--hairline)'}`, background: on ? 'var(--surface)' : 'transparent',
                  boxShadow: on ? `0 0 0 3px ${id === 'good' ? 'var(--success-soft)' : id === 'bad' ? 'var(--danger-soft)' : 'var(--elevated)'}` : 'none', transition: 'border-color 160ms, box-shadow 160ms' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', flex: '0 0 auto', background: on ? col : 'transparent', border: `1.5px solid ${on ? col : 'var(--hairline-2)'}` }} />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: on ? 'var(--ink)' : 'var(--ink-2)' }}>{label}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)', flex: 1 }}>{desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* decision */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--hairline)' }}>
        <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 11 }}>Decision</div>
        <div className="row" style={{ gap: 8 }}>
          {[['approve', 'Approve', 'check', 'var(--success)'], ['reject', 'Request changes', 'flag', 'var(--danger)']].map(([id, label, ic, col]) => {
            const on = decision === id;
            return (
              <button key={id} onClick={() => setDecision(id)} className="row"
                style={{ gap: 7, flex: 1, justifyContent: 'center', padding: '9px 10px', borderRadius: 8, cursor: 'pointer',
                  border: `1px solid ${on ? col : 'var(--hairline)'}`, background: on ? (id === 'approve' ? 'var(--success-soft)' : 'var(--danger-soft)') : 'var(--surface)',
                  color: on ? col : 'var(--muted)', font: '600 12px/1 var(--font-sans)', transition: 'all 160ms' }}>
                <Icon name={ic} size={14} />{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* thread */}
      <div style={{ padding: '18px 20px', maxHeight: 360, overflow: 'auto' }}>
        <div style={{ font: '600 9px/1 var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 16 }}>Thread · {thread.length}</div>
        <div className="stack" style={{ gap: 18 }}>
          {thread.map(item => <ThreadItem key={item.id} item={item} />)}
        </div>
      </div>

      {/* composer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--hairline)', background: 'var(--bg-2)' }}>
        <textarea className="textarea" rows={2} placeholder="Add a comment or leave review notes…" value={text}
          onChange={e => setText(e.target.value)} style={{ minHeight: 52, background: 'var(--surface)' }} />
        <div className="row" style={{ gap: 8, marginTop: 10 }}>
          <Btn variant="ghost" onClick={() => post('comment')} style={{ flex: 1 }}><Icon name="message" size={13} />Comment</Btn>
          <Btn variant="primary" onClick={() => post('review')} style={{ flex: 1 }}>
            <Icon name={decision === 'approve' ? 'check' : 'flag'} size={14} />{decision === 'approve' ? 'Approve job' : 'Request'}
          </Btn>
        </div>
      </div>
    </div>
  );
}
window.ReviewRail = ReviewRail;
