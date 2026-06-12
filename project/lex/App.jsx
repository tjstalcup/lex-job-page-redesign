/* Lex — root router. Wires dashboard → board → job → A/B lab + side screens. */
function App() {
  const [active, setActive] = React.useState('dashboard');
  const [job, setJob] = React.useState(null); // { id, tab }

  const navigate = (id) => { setJob(null); setActive(id); };
  const openJob = (id, opts) => { setJob({ id, tab: (opts && opts.tab) || 'overview' }); setActive('board'); };
  const backToBoard = () => { setJob(null); setActive('board'); };

  let screen, crumbs;
  if (job) {
    const j = window.LEX.jobs.find((x) => x.id === job.id);
    crumbs = [{ label: 'Pipeline', to: 'board' }, { label: j ? j.id : job.id }];
    screen = <Job jobId={job.id} initialTab={job.tab} onBack={backToBoard} onNavigate={navigate} />;
  } else if (active === 'dashboard') {
    crumbs = [{ label: 'Home' }];
    screen = <Dashboard onNavigate={navigate} onOpenJob={openJob} />;
  } else if (active === 'board') {
    crumbs = [{ label: 'Workspace' }, { label: 'Pipeline' }];
    screen = <Board onOpenJob={openJob} />;
  } else if (active === 'metrics') {
    crumbs = [{ label: 'Workspace' }, { label: 'Metrics' }];
    screen = <Metrics />;
  } else if (active === 'tokens') {
    crumbs = [{ label: 'Workspace' }, { label: 'Tokens' }];
    screen = <Tokens />;
  } else if (active === 'roadmap') {
    crumbs = [{ label: 'Library' }, { label: 'Roadmap' }];
    screen = <Roadmap />;
  } else if (active === 'skills') {
    crumbs = [{ label: 'Library' }, { label: 'Skills' }];
    screen = <Placeholder title="Skills" icon="settings" note="Transparency into the skills Lex is using, with analyst-owned forks. Wires up next." />;
  } else {
    crumbs = [{ label: 'Library' }, { label: 'Conventions' }];
    screen = <Placeholder title="Conventions" icon="book" note="House style for contracts, grain, and naming. Tucked away — reachable when you need it." />;
  }

  const maxW = job || active === 'board' ? 1280 : active === 'dashboard' ? 1240 : 1180;

  return (
    <div className="app">
      <Rail active={job ? 'board' : active} onNavigate={navigate} />
      <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar crumbs={crumbs} onCrumb={navigate} />
        <main className="canvas" style={{ flex: 1 }}>
          <div style={{ maxWidth: maxW, margin: '0 auto' }} key={active + (job ? job.id + job.tab : '')}>
            {screen}
          </div>
        </main>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
