-- WorkerRight — Supabase leads table
-- Run this in your Supabase SQL editor

create table if not exists leads (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),

  -- Contact
  name                 text,
  phone                text,
  email                text,

  -- Case context
  country              text not null default 'us',
  state                text,
  industry             text,
  injury_type          text,
  body_part            text,

  -- Calculator inputs (V2)
  weekly_wage          numeric(10,2),
  employment_months    integer,
  impairment_rating    numeric(5,2),
  is_estimated_rating  boolean,
  treatment_weeks      integer,
  employment_status    text,
  employer_control     text,
  severity_level       text,
  treatment_status     text,
  claim_status         text,
  company_offer        numeric(12,2),
  mmi_reached          boolean,

  -- Calculator outputs
  ttd_estimate         numeric(12,2),
  ppd_estimate         numeric(12,2),
  medical_estimate     numeric(12,2),
  total_low            numeric(12,2),
  total_high           numeric(12,2),
  case_strength        text,
  case_strength_score  integer,

  -- Lead status
  consent              boolean not null default false,
  status               text not null default 'new',
  contacted            boolean default false,
  notes                text,

  -- Metadata
  source_url           text,
  utm_source           text,
  utm_medium           text,
  utm_campaign         text
);

-- Indexes for common queries
create index if not exists leads_state_idx            on leads(state);
create index if not exists leads_created_at_idx       on leads(created_at desc);
create index if not exists leads_contacted_idx        on leads(contacted);
create index if not exists leads_status_idx           on leads(status);
create index if not exists leads_case_strength_idx    on leads(case_strength);

-- Row-Level Security: allow anon inserts (form submissions), restrict reads to service role
alter table leads enable row level security;

create policy "Allow anonymous inserts" on leads
  for insert to anon
  with check (true);

create policy "Service role full access" on leads
  for all to service_role
  using (true)
  with check (true);

-- Optional: view for quick lead review (excludes PII columns)
create or replace view lead_summary as
  select
    id,
    created_at,
    state,
    industry,
    injury_type,
    employment_status,
    severity_level,
    claim_status,
    case_strength,
    case_strength_score,
    total_low,
    total_high,
    status,
    contacted
  from leads
  order by created_at desc;

-- call_clicks tracking table
create table if not exists call_clicks (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  state            text,
  injury           text,
  estimated_total  int,
  source_url       text
);

alter table call_clicks enable row level security;

create policy "Allow insert call_clicks"
  on call_clicks for insert
  with check (true);
