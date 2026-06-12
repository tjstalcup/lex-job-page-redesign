/* ============================================================
   LEX — Mock data. Modeled on the real Analytics Pipeline:
   real job slugs, versions, seat-share costs, verify tests,
   review history, A/B runs. Cosmetic only.
   ============================================================ */
window.LEX = {
  org: { name: 'Lex', tagline: 'Analytics Pipeline', version: 'v0.5.11', env: 'local' },
  user: { name: 'Jane Smith', initials: 'JS', role: 'Reviewer' },

  nav: [
    { group: 'Workspace', items: [
      { id: 'dashboard', icon: 'home',  label: 'Home' },
      { id: 'board',     icon: 'pipe',  label: 'Pipeline', count: 7 },
      { id: 'metrics',   icon: 'pulse', label: 'Metrics' },
      { id: 'tokens',    icon: 'layers',label: 'Tokens' },
    ]},
    { group: 'Library', items: [
      { id: 'skills',    icon: 'settings', label: 'Skills' },
      { id: 'roadmap',   icon: 'flag',     label: 'Roadmap' },
      { id: 'docs',      icon: 'book',      label: 'Conventions' },
    ]},
  ],

  // Pipeline board snapshot strip
  board: { tracked: 7, inFlight: 2, awaitingReview: 1, reviewed: 6, completed: 5, lastSync: '2m ago' },

  // OKR / adoption metrics (Metrics page snapshot)
  okr: {
    window: 'June 2026 · last 7 days',
    trajectory: { value: 100.0, target: 90.25, label: '95/95 trajectory', note: 'adoption × good-share, vs. 95% × 95% = 90.25%', status: 'on-target' },
    cards: [
      { label: 'Adoption rate', value: '100.0%', sub: '+100.0 pts WoW', target: '≥ 80% (proposed)', ok: true, foot: '1 of 1 analysts shipped a verified job' },
      { label: 'Time-to-deliverable', value: '35.2 min', sub: 'no prior week', target: '≤ 30 min (proposed)', ok: false, foot: 'n=1 of 1 done jobs measurable' },
      { label: 'Reliance', value: '1.00', sub: 'no prior week', target: '≥ 2 / wk (proposed)', ok: false, foot: '1 job · 1 active analyst' },
      { label: 'Good-share', value: '100.0%', sub: 'no prior week', target: 'TBD (proposed)', ok: true, foot: 'good 1 · neutral 0 · bad 0' },
    ],
  },

  // Token & cost trends (Tokens page snapshot)
  tokens: {
    plan: 'Claude-Max-Enterprise', fleetBill: '$800/mo', monthlyTokens: '482.88M', baseline: '2026-05-28',
    cards: [
      { label: 'Jobs tracked', value: '3' },
      { label: 'Amortized seat share', value: '~$55.55', sub: 'share of $800/mo bill' },
      { label: 'Marginal', value: '~$0.00', sub: 'assumed ~$0 (Max plan)' },
      { label: 'List-price ref', value: '~$105.53', sub: 'capacity comparison only' },
      { label: 'Input tokens', value: '64.1k' },
      { label: 'Output tokens', value: '260.1k' },
      { label: 'Cache reads', value: '31.17M' },
    ],
    byVersion: [
      { version: 'v0.5.0', jobs: 1, seat: '$1.5485',  listRef: '~$3.43',  contract: '~$0.31', build: '~$0.48', verify: '~$2.14', summary: '~$0.50' },
      { version: 'v0.3.0', jobs: 1, seat: '$16.8804', listRef: '~$34.21', contract: '~$2.10', build: '~$7.61', verify: '~$6.40', summary: '~$0.78' },
      { version: 'unknown',jobs: 1, seat: '$37.1258', listRef: '~$67.89', contract: '~$3.90', build: '~$20.14',verify: '~$11.6', summary: '~$1.50' },
    ],
  },

  // Roadmap snapshot (now-wave)
  roadmap: {
    waves: 11, stories: 123, daysToTarget: 20,
    okr: 'Drive user-adoption rate and reliance on the tool. Reduce time-to-deliverable rate. Defer everything else.',
    krs: [
      { label: 'Adoption rate', value: '≥ 80%', sub: 'active analysts / week' },
      { label: 'Time-to-deliverable', value: '≤ 30 min', sub: 'median /lex → verify PASS' },
      { label: 'Reliance', value: '≥ 2 / wk', sub: 'reports per active analyst' },
      { label: 'Thumbs-up', value: '≥ 80%', sub: 'by week 4' },
    ],
    now: { wave: 'W5 · v0.5.0', focus: 'Adoption + time-to-deliverable', planned: 32 },
    stories_now: [
      { id: 'W5-S24', status: 'planned', title: 'Parametric A/B dimensions (model, version) in /lex-ab', sp: 3, note: 'Beyond skill-fork: --dimension model:opus,sonnet and --dimension version:HEAD…' },
      { id: 'W5-S28', status: 'in-progress', title: "Excel .xlsx smoke test in --files mode", sp: 1, note: 'OKR-adjacent (adoption). Flagged untested in analyst onboarding.' },
      { id: 'W5-S32', status: 'planned', title: 'Synthetic dummy data in data-preview redaction', sp: 2, note: 'Adoption-adjacent. Data-preview card replaces PII.' },
    ],
  },

  // ---- JOBS ----
  // status: contract | build | verify | review | done
  jobs: [
    {
      id: 'weekly-active-users-plan-tier-10-days',
      title: 'Weekly Active Users by Plan Tier (Last 10 Days)',
      status: 'done', version: 'v0.5.0', iteration: 1, ctes: 7, domain: 'growth',
      owner: 'TJ Stalcup', updated: 'Jun 5, 2026 · 2:15 PM', built: '2026-06-05',
      seatShare: '$1.5485', marginal: '$0.00', listRef: '$3.43',
      phaseCost: { contract: 0.31, build: 0.48, verify: 2.14, summary: 0.50 },
      grain: 'One row represents one plan tier per ISO week within the last 10 days.',
      summary: "This job tracks the count of distinct active users in each plan tier, broken out by ISO week, across the trailing 10-day window. It feeds the growth team's daily WAU-by-tier dashboard and is scoped to active accounts only. Because 10 days spans 2 to 3 ISO weeks, boundary weeks are partial — those rows carry an is_partial_week flag so readers can interpret the count in context.",
      questions: [
        'How many distinct active users were there per plan tier in each ISO week of the last 10 days?',
        'Which plan tier has the largest weekly active user base in the trailing 10-day window?',
        'How does weekly active user volume vary across plan tiers week over week within the last 10 days?',
      ],
      columns: [
        { name: 'iso_week', source: 'derived', desc: 'ISO week start date (Monday) bucketing user activity into weekly windows.' },
        { name: 'plan_tier', source: 'dim_plans', desc: 'Plan tier of the account the user belongs to (free, starter, growth, enterprise).' },
        { name: 'weekly_active_users', source: 'derived', desc: 'Count of distinct users with at least one qualifying event in the ISO week, scoped to active accounts.' },
      ],
      sources: ['fct_events', 'dim_users', 'dim_accounts', 'dim_plans'],
      sql: `-- Job:        weekly-active-users-plan-tier-10-days
-- Title:      Weekly Active Users by Plan Tier (Last 10 Days)
-- Grain:      One row represents one plan tier per ISO week within the last 10 days.
-- Sources:    fct_events, dim_users, dim_accounts, dim_plans
-- Built:      2026-06-05
-- Iteration:  1
--
-- Partial-week handling (contract notes):
--   A 10-day window will overlap 2 (occasionally 3) ISO weeks. The boundary
--   weeks at either end are partial — the 10-day window does not cover the
--   full Monday-Sunday span. weekly_active_users for those weeks is therefore
--   a count over fewer than 7 days and is NOT directly comparable to a fully
--   covered week. The is_partial_week flag in the final SELECT surfaces this
--   explicitly so reviewers can interpret boundary weeks accordingly.

WITH date_spine AS (
  SELECT generate_series(
    date_trunc('week', CURRENT_DATE - INTERVAL '10 days'),
    date_trunc('week', CURRENT_DATE),
    INTERVAL '1 week'
  )::date AS week_start
),
all_plan_tiers AS (
  SELECT DISTINCT plan_tier FROM dim_plans
),
scaffold AS (
  SELECT ds.week_start, pt.plan_tier
  FROM date_spine ds CROSS JOIN all_plan_tiers pt
),
qualifying_events AS (
  SELECT fe.user_id, date_trunc('week', fe.event_ts)::date AS week_start
  FROM fct_events fe
  WHERE fe.event_ts >= CURRENT_DATE - INTERVAL '10 days'
),
active_users_per_week_tier AS (
  SELECT qe.week_start, dp.plan_tier,
         COUNT(DISTINCT qe.user_id) AS weekly_active_users
  FROM qualifying_events qe
  JOIN dim_users du   ON du.user_id = qe.user_id
  JOIN dim_accounts da ON da.account_id = du.account_id AND da.is_active
  JOIN dim_plans dp    ON dp.plan_id = da.plan_id
  GROUP BY 1, 2
),
scaffold_with_coverage AS (
  SELECT s.week_start, s.plan_tier,
         (s.week_start < CURRENT_DATE - INTERVAL '7 days') AS is_partial_week
  FROM scaffold s
)
SELECT swc.week_start AS iso_week,
       swc.plan_tier,
       COALESCE(au.weekly_active_users, 0) AS weekly_active_users,
       swc.is_partial_week
FROM scaffold_with_coverage swc
LEFT JOIN active_users_per_week_tier au
  ON au.week_start = swc.week_start AND au.plan_tier = swc.plan_tier
ORDER BY swc.week_start, swc.plan_tier;`,
      tests: [
        { name: 'grain_test_one_plan_tier_per_iso_week', result: 'pass', detail: "Final SELECT projects iso_week and plan_tier from scaffold_with_coverage, a CROSS JOIN of date_spine (one row per ISO week) and all_plan_tiers (DISTINCT plan_tier). The scaffold structurally guarantees one row per (plan_tier, iso_week) — no GROUP BY needed at the final layer because the LEFT JOIN onto active_users_per_week_tier cannot fan out. Grain matches contract." },
        { name: 'non_empty_result_set', result: 'pass', detail: 'No WHERE 1=0, LIMIT 0, or empty-set constructs. date_spine generates ≥2 ISO weeks for any 10-day window; all_plan_tiers selects DISTINCT plan_tier (≥1 row in dim_plans), so the scaffold yields ≥2 rows. COALESCE on weekly_active_users ensures empty buckets surface as 0 rather than disappearing.' },
        { name: 'business_question_coverage_distinct_active_users', result: 'pass', detail: "Question 1: 'How many distinct active users per plan tier per ISO week?' All three key columns present in final SELECT. weekly_active_users is COUNT(DISTINCT fe.user_id), satisfying the 'distinct active users' definition." },
        { name: 'business_question_coverage_largest_tier', result: 'pass', detail: "Question 2: 'Which plan tier has the largest weekly active user base?' Output exposes plan_tier and weekly_active_users at the per-week grain; a downstream MAX/rank answers it directly." },
        { name: 'active_account_scoping', result: 'pass', detail: 'JOIN onto dim_accounts is gated by da.is_active, so deactivated accounts are excluded from the count per the contract scope.' },
        { name: 'partial_week_flagged', result: 'pass', detail: 'is_partial_week is computed for boundary weeks and surfaced in the final projection so reviewers can interpret short-window counts.' },
        { name: 'no_cartesian_fanout', result: 'warn', detail: 'LEFT JOIN onto active_users_per_week_tier is on (week_start, plan_tier) — both grouped keys, so no fan-out is possible. Flagged as a soft check only: live row count not verified — no database connector available.' },
      ],
      deliverables: [
        { type: 'sql', name: 'weekly_active_users_plan_tier.sql', size: '3.1 KB', primary: true, lines: 58 },
        { type: 'md',  name: 'summary.md', size: '1.4 KB' },
        { type: 'json',name: 'manifest.json', size: '0.6 KB' },
      ],
      cloud: 's3://lex-deliverables/growth/weekly-active-users-plan-tier-10-days/v0.5.0/',
      reviews: [
        { who: 'TJ', initials: 'TJ', decision: 'approved', when: '6/5/2026, 10:05:30 AM', note: 'lgtm — partial-week flag is a nice touch, ships the WAU dashboard cleanly.' },
      ],
      // version lineage for the git-style board
      lineage: [
        { version: 'unknown', date: '2026-05-19', seat: '$37.1258', note: 'First cut — no caching, full table scan on fct_events.', tests: '9/12' },
        { version: 'v0.3.0', date: '2026-05-22', seat: '$16.8804', note: 'Added date_spine scaffold + plan-tier dim join. Cut output tokens 60%.', tests: '11/12' },
        { version: 'v0.5.0', date: '2026-06-05', seat: '$1.5485', note: 'Cache-warmed CTEs + scoped event window. is_partial_week flag added.', tests: '12/12', current: true },
      ],
      // A/B lab runs (persistent tabs)
      ab: [
        { id: 'ab-1', label: 'v0.3.0 → v0.5.0', date: '2026-06-05', pinned: true, winner: 'b',
          a: { version: 'v0.3.0', seat: 16.8804, listRef: 34.21, input: '4.6k', output: '72.0k', cache: '9.33M', rows: '72.0k', tests: '11/12', latency: '52s' },
          b: { version: 'v0.5.0', seat: 1.5485,  listRef: 3.43,  input: '11',   output: '4.3k',  cache: '831.0k', rows: '4.3k',  tests: '12/12', latency: '14s' },
          diff: [
            { kind: 'del', text: "WHERE fe.event_ts >= CURRENT_DATE - INTERVAL '10 days'" },
            { kind: 'add', text: "WHERE fe.event_ts >= date_trunc('week', CURRENT_DATE - INTERVAL '10 days')" },
            { kind: 'ctx', text: 'GROUP BY 1, 2' },
            { kind: 'del', text: 'SELECT user_id, event_ts FROM fct_events fe' },
            { kind: 'add', text: 'SELECT fe.user_id, date_trunc(\'week\', fe.event_ts) FROM fct_events fe /*+ cache */' },
          ] },
        { id: 'ab-2', label: 'v0.4.0 → v0.5.0', date: '2026-06-04', pinned: false, winner: 'b',
          a: { version: 'v0.4.0', seat: 4.2210, listRef: 9.88, input: '1.2k', output: '12.0k', cache: '3.10M', rows: '12.0k', tests: '12/12', latency: '28s' },
          b: { version: 'v0.5.0', seat: 1.5485, listRef: 3.43, input: '11',   output: '4.3k',  cache: '831.0k', rows: '4.3k',  tests: '12/12', latency: '14s' },
          diff: [
            { kind: 'ctx', text: 'WITH date_spine AS (...)' },
            { kind: 'del', text: 'JOIN dim_accounts da ON da.account_id = du.account_id' },
            { kind: 'add', text: 'JOIN dim_accounts da ON da.account_id = du.account_id AND da.is_active' },
          ] },
        { id: 'ab-3', label: 'opus vs sonnet · v0.5.0', date: '2026-06-05', pinned: false, winner: 'b',
          a: { version: 'opus-4', seat: 2.9100, listRef: 6.40, input: '11', output: '4.3k', cache: '831.0k', rows: '4.3k', tests: '12/12', latency: '22s' },
          b: { version: 'sonnet-4', seat: 1.5485, listRef: 3.43, input: '11', output: '4.3k', cache: '831.0k', rows: '4.3k', tests: '12/12', latency: '14s' },
          diff: [
            { kind: 'ctx', text: 'Identical SQL output — model swap only.' },
            { kind: 'ctx', text: 'sonnet-4 produced byte-identical deliverable at 0.53× seat-share.' },
          ] },
      ],
    },

    {
      id: 'tier-plan-conversions-last-7-days',
      title: 'Tier Plan Conversions (Last 7 Days)',
      status: 'done', version: 'v0.3.0', iteration: 2, ctes: 5, domain: 'growth',
      owner: 'TJ Stalcup', updated: 'May 22, 2026 · 7:07 PM', built: '2026-05-22',
      seatShare: '$16.8804', marginal: '$0.00', listRef: '$34.21',
      phaseCost: { contract: 2.10, build: 7.61, verify: 6.40, summary: 0.78 },
      grain: 'One row per source tier → target tier transition within the last 7 days.',
      summary: 'Counts upgrade and downgrade transitions between plan tiers over the trailing 7-day window, used by the growth team to track conversion velocity after the pricing change.',
      questions: ['How many accounts moved between plan tiers in the last 7 days?', 'What is the net upgrade rate by source tier?'],
      columns: [
        { name: 'source_tier', source: 'dim_plans', desc: 'Plan tier the account converted from.' },
        { name: 'target_tier', source: 'dim_plans', desc: 'Plan tier the account converted to.' },
        { name: 'conversions', source: 'derived', desc: 'Count of distinct accounts making the transition.' },
      ],
      sources: ['fct_subscription_events', 'dim_accounts', 'dim_plans'],
      sql: '-- tier-plan-conversions-last-7-days · v0.3.0\nWITH ...\nSELECT source_tier, target_tier, COUNT(DISTINCT account_id) AS conversions\nFROM ...;',
      tests: [
        { name: 'grain_test_one_transition_per_row', result: 'pass', detail: 'Grain matches contract.' },
        { name: 'non_empty_result_set', result: 'pass', detail: 'Scaffold yields all tier pairs.' },
        { name: 'self_transition_excluded', result: 'pass', detail: 'source_tier <> target_tier enforced.' },
      ],
      deliverables: [{ type: 'sql', name: 'tier_plan_conversions.sql', size: '2.2 KB', primary: true, lines: 41 }, { type: 'md', name: 'summary.md', size: '1.1 KB' }],
      cloud: 's3://lex-deliverables/growth/tier-plan-conversions-last-7-days/v0.3.0/',
      reviews: [{ who: 'TJ', initials: 'TJ', decision: 'approved', when: '5/22/2026, 7:30:00 PM', note: 'Approved.' }],
      lineage: [
        { version: 'v0.1.0', date: '2026-05-20', seat: '$34.20', note: 'Initial build.', tests: '7/9' },
        { version: 'v0.3.0', date: '2026-05-22', seat: '$16.88', note: 'Deduped subscription events.', tests: '9/9', current: true },
      ],
      ab: [],
    },

    {
      id: 'most-active-users-last-30-days',
      title: 'Most Active Users — Last 30 Days',
      status: 'done', version: 'v0.2.0', iteration: 1, ctes: 4, domain: 'growth',
      owner: 'TJ Stalcup', updated: 'May 19, 2026 · 6:24 PM', built: '2026-05-19',
      seatShare: '$37.1258', marginal: '$0.00', listRef: '$67.89',
      phaseCost: { contract: 3.90, build: 20.14, verify: 11.6, summary: 1.50 },
      grain: 'One row per user, ranked by activity over the last 30 days.',
      summary: 'Ranks users by qualifying-event count over the trailing 30 days. The most expensive job in the ledger — pre-caching baseline.',
      questions: ['Who are the most active users in the last 30 days?'],
      columns: [
        { name: 'user_id', source: 'dim_users', desc: 'The user.' },
        { name: 'event_count', source: 'derived', desc: 'Qualifying events in window.' },
      ],
      sources: ['fct_events', 'dim_users'],
      sql: '-- most-active-users-last-30-days · v0.2.0\nSELECT user_id, COUNT(*) AS event_count\nFROM fct_events\nWHERE event_ts >= CURRENT_DATE - INTERVAL \'30 days\'\nGROUP BY 1 ORDER BY 2 DESC;',
      tests: [
        { name: 'grain_test_one_user_per_row', result: 'pass', detail: 'GROUP BY user_id.' },
        { name: 'non_empty_result_set', result: 'pass', detail: 'OK.' },
        { name: 'window_bound_30_days', result: 'pass', detail: 'Interval correct.' },
      ],
      deliverables: [{ type: 'sql', name: 'most_active_users.sql', size: '1.0 KB', primary: true, lines: 18 }],
      cloud: 's3://lex-deliverables/growth/most-active-users-last-30-days/v0.2.0/',
      reviews: [{ who: 'TJ', initials: 'TJ', decision: 'approved', when: '5/19/2026, 6:40:00 PM', note: 'Approved — flag for caching pass.' }],
      lineage: [{ version: 'v0.2.0', date: '2026-05-19', seat: '$37.13', note: 'First shipped cut.', tests: '3/3', current: true }],
      ab: [],
    },

    {
      id: 'least-active-users-last-90-days',
      title: 'Least Active Users (Last 90 Days)',
      status: 'done', version: 'v0.1.0', iteration: 1, ctes: 4, domain: 'retention',
      owner: 'TJ Stalcup', updated: 'May 19, 2026 · 2:22 PM', built: '2026-05-19',
      seatShare: '$22.40', marginal: '$0.00', listRef: '$44.10',
      phaseCost: { contract: 2.80, build: 12.0, verify: 6.8, summary: 0.80 },
      grain: 'One row per active account with the fewest qualifying events in 90 days.',
      summary: 'Surfaces dormant accounts for the retention team — accounts with the lowest activity over the trailing 90 days.',
      questions: ['Which active accounts are least engaged over 90 days?'],
      columns: [
        { name: 'account_id', source: 'dim_accounts', desc: 'Active account.' },
        { name: 'event_count', source: 'derived', desc: 'Events in 90-day window.' },
      ],
      sources: ['fct_events', 'dim_accounts'],
      sql: '-- least-active-users-last-90-days · v0.1.0\nSELECT account_id, COUNT(*) AS event_count\nFROM ... ORDER BY 2 ASC;',
      tests: [
        { name: 'grain_test_one_account_per_row', result: 'pass', detail: 'OK.' },
        { name: 'active_account_scoping', result: 'pass', detail: 'is_active gate present.' },
        { name: 'non_empty_result_set', result: 'pass', detail: 'OK.' },
      ],
      deliverables: [{ type: 'sql', name: 'least_active_users.sql', size: '1.1 KB', primary: true, lines: 20 }],
      cloud: 's3://lex-deliverables/retention/least-active-users-last-90-days/v0.1.0/',
      reviews: [{ who: 'TJ', initials: 'TJ', decision: 'approved', when: '5/19/2026, 3:00:00 PM', note: 'Approved.' }],
      lineage: [{ version: 'v0.1.0', date: '2026-05-19', seat: '$22.40', note: 'First cut.', tests: '3/3', current: true }],
      ab: [],
    },

    {
      id: 'new-users-since-launch-2026-05-18',
      title: 'New Users Since Launch (2026-05-18 Noon UTC)',
      status: 'done', version: 'v0.2.0', iteration: 1, ctes: 3, domain: 'growth',
      owner: 'TJ Stalcup', updated: 'May 19, 2026 · 3:13 PM', built: '2026-05-19',
      seatShare: '$8.90', marginal: '$0.00', listRef: '$17.60',
      phaseCost: { contract: 1.40, build: 4.6, verify: 2.5, summary: 0.40 },
      grain: 'One row per day since launch with new-user counts.',
      summary: 'Daily count of newly registered users since the 2026-05-18 noon-UTC launch, used for the launch retro.',
      questions: ['How many new users registered each day since launch?'],
      columns: [
        { name: 'signup_date', source: 'derived', desc: 'Day of registration.' },
        { name: 'new_users', source: 'derived', desc: 'Distinct new registrations.' },
      ],
      sources: ['dim_users'],
      sql: '-- new-users-since-launch-2026-05-18 · v0.2.0\nSELECT signup_date::date, COUNT(*) AS new_users FROM dim_users\nWHERE signup_ts >= TIMESTAMP \'2026-05-18 12:00 UTC\' GROUP BY 1;',
      tests: [
        { name: 'grain_test_one_day_per_row', result: 'pass', detail: 'OK.' },
        { name: 'launch_boundary_inclusive', result: 'pass', detail: 'Noon-UTC boundary inclusive.' },
        { name: 'non_empty_result_set', result: 'pass', detail: 'OK.' },
      ],
      deliverables: [{ type: 'sql', name: 'new_users_since_launch.sql', size: '0.9 KB', primary: true, lines: 16 }],
      cloud: 's3://lex-deliverables/growth/new-users-since-launch-2026-05-18/v0.2.0/',
      reviews: [{ who: 'TJ', initials: 'TJ', decision: 'approved', when: '5/19/2026, 3:30:00 PM', note: 'Approved.' }],
      lineage: [{ version: 'v0.2.0', date: '2026-05-19', seat: '$8.90', note: 'First cut.', tests: '3/3', current: true }],
      ab: [],
    },

    {
      id: 'churn-risk-signals-90d',
      title: 'Churn-Risk Signals (90-Day Rolling)',
      status: 'review', version: 'v0.4.0', iteration: 3, ctes: 9, domain: 'retention',
      owner: 'A. Khan', updated: 'Jun 9, 2026 · 4:48 PM', built: '2026-06-09',
      seatShare: '$3.9120', marginal: '$0.00', listRef: '$8.74',
      phaseCost: { contract: 0.62, build: 1.40, verify: 1.50, summary: 0.39 },
      grain: 'One row per account with a composite churn-risk score over the last 90 days.',
      summary: 'Blends declining-activity, support-ticket, and billing-failure signals into a single 0–100 churn-risk score per account. Awaiting peer review before it can feed the retention playbook.',
      questions: ['Which accounts are at highest risk of churning in the next 30 days?', 'What signals contribute most to each account\'s risk score?'],
      columns: [
        { name: 'account_id', source: 'dim_accounts', desc: 'Active account being scored.' },
        { name: 'risk_score', source: 'derived', desc: 'Composite 0–100 churn-risk score.' },
        { name: 'top_signal', source: 'derived', desc: 'Highest-weighted contributing signal.' },
      ],
      sources: ['fct_events', 'fct_support_tickets', 'fct_billing', 'dim_accounts'],
      sql: '-- churn-risk-signals-90d · v0.4.0 · 9 CTEs\nWITH activity_decline AS (...), ticket_load AS (...), billing_fail AS (...)\nSELECT account_id, risk_score, top_signal FROM composite ORDER BY risk_score DESC;',
      tests: [
        { name: 'grain_test_one_account_per_row', result: 'pass', detail: 'Composite CTE groups by account_id.' },
        { name: 'risk_score_bounded_0_100', result: 'pass', detail: 'Score clamped via LEAST(100, GREATEST(0, ...)).' },
        { name: 'signal_weights_sum_to_one', result: 'fail', detail: 'Configured signal weights sum to 1.04, not 1.00 — billing_fail weight (0.34) should be 0.30. Risk scores are inflated ~4% across the board. Fix the weight constant before approval.' },
        { name: 'non_empty_result_set', result: 'pass', detail: 'OK.' },
        { name: 'active_account_scoping', result: 'pass', detail: 'is_active gate present.' },
      ],
      deliverables: [
        { type: 'sql', name: 'churn_risk_signals.sql', size: '5.8 KB', primary: true, lines: 112 },
        { type: 'md', name: 'summary.md', size: '1.8 KB' },
        { type: 'json', name: 'manifest.json', size: '0.7 KB' },
      ],
      cloud: 's3://lex-deliverables/retention/churn-risk-signals-90d/v0.4.0/',
      reviews: [],
      lineage: [
        { version: 'v0.2.0', date: '2026-06-06', seat: '$9.10', note: 'Activity-decline signal only.', tests: '5/7' },
        { version: 'v0.3.0', date: '2026-06-08', seat: '$5.60', note: 'Added ticket + billing signals.', tests: '6/8' },
        { version: 'v0.4.0', date: '2026-06-09', seat: '$3.91', note: 'Cache-warmed; awaiting review.', tests: '4/5', current: true },
      ],
      ab: [],
    },

    {
      id: 'w4-cost-truthing-plan',
      title: 'W4 Cost-Truthing Plan',
      status: 'contract', version: 'draft', iteration: 0, ctes: 0, domain: 'ops',
      owner: 'TJ Stalcup', updated: 'May 29, 2026 · 12:42 PM', built: null,
      seatShare: '—', marginal: '—', listRef: '—',
      phaseCost: { contract: 0.18, build: 0, verify: 0, summary: 0 },
      grain: 'TBD — contract in progress.',
      summary: 'Defining the contract: reconcile Lex amortized seat-share estimates against the actual Claude-Max-Enterprise fleet bill so the Tokens page numbers can be trusted. Still gathering business questions.',
      questions: ['Does amortized seat-share reconcile to the $800/mo fleet bill?', 'Where does the list-price reference diverge from realized spend?'],
      columns: [],
      sources: ['lex_run_ledger', 'fleet_billing_export'],
      sql: '',
      tests: [],
      deliverables: [],
      cloud: null,
      reviews: [],
      lineage: [{ version: 'draft', date: '2026-05-29', seat: '—', note: 'Contract drafting — business questions in flux.', tests: '—', current: true }],
      ab: [],
    },
  ],
};

// Cost-down trend for the hero job (used by A/B lab chart)
window.LEX.jobs[0].costTrend = [
  { label: 'unknown', date: '05-19', seat: 37.1258 },
  { label: 'v0.3.0', date: '05-22', seat: 16.8804 },
  { label: 'v0.4.0', date: '06-04', seat: 4.2210 },
  { label: 'v0.5.0', date: '06-05', seat: 1.5485 },
];
