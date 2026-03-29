-- WorkInjuryCalc — Supabase leads table
-- Run this in your Supabase SQL editor

create table if not exists leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- Contact
  name              text,
  phone             text,
  email             text,

  -- Case context
  country           text not null default 'us',
  state             text,
  industry          text,
  injury_type       text,
  body_part         text,

  -- Calculator inputs
  weekly_wage       numeric(10,2),
  employment_months integer,
  impairment_rating numeric(5,2),
  treatment_weeks   integer,
  employment_status text,
  mmi_reached       boolean,

  -- Calculator outputs
  ttd_estimate      numeric(12,2),
  ppd_estimate      numeric(12,2),
  medical_estimate  numeric(12,2),
  total_low         numeric(12,2),
  total_high        numeric(12,2),
  case_strength     text,

  -- Metadata
  source_url        text,
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  contacted         boolean default false,
  notes             text
);

-- Indexes for common queries
create index if not exists leads_state_idx       on leads(state);
create index if not exists leads_created_at_idx  on leads(created_at desc);
create index if not exists leads_contacted_idx   on leads(contacted);

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
    case_strength,
    total_low,
    total_high,
    contacted
  from leads
  order by created_at desc;
