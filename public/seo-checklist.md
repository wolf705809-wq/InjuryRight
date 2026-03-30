# WorkerRight — SEO 배포 후 모니터링 체크리스트

## Day 1 (배포 직후)

- [ ] `https://getfairclaimpro.com/sitemap.xml` 브라우저 접근 확인
- [ ] `https://getfairclaimpro.com/robots.txt` 확인 — Sitemap URL 포함 여부
- [ ] Rich Results Test 3개 페이지 검증
  - 홈: https://search.google.com/test/rich-results?url=https://getfairclaimpro.com
  - 계산기: https://search.google.com/test/rich-results?url=https://getfairclaimpro.com/calculator
  - CA 건설 허리부상: https://search.google.com/test/rich-results?url=https://getfairclaimpro.com/california/construction/back-injury
- [ ] Schema 검증 스크립트 실행: `BASE_URL=https://getfairclaimpro.com npm run validate:schema`
- [ ] PageSpeed Insights 모바일 기준 측정
  - LCP 목표: < 2.5s
  - FID 목표: < 100ms
  - CLS 목표: < 0.1
- [ ] Google Search Console에 sitemap.xml 제출
- [ ] Vercel 환경변수 `SITEMAP_PHASE` 확인 (Phase 1 = `1`)

## 1주일 후

- [ ] GSC Coverage 탭 — 인덱싱 오류 없는지 확인
- [ ] GSC Enhancements 탭 — FAQ Rich Snippet 오류 확인
- [ ] CA, TX, FL 주 페이지 구글 캐시 확인 (`cache:getfairclaimpro.com/california`)
- [ ] 주요 5개 주 (CA/TX/FL/NY/IL) 인덱싱 상태 확인

## 1개월 후

- [ ] GSC Performance 탭 — 어떤 쿼리로 유입되는지 확인
- [ ] CTR 3% 미만 페이지 → Title/Description 수정
- [ ] 0클릭 노출 쿼리 → FAQ에 해당 질문 추가
- [ ] `/workers-comp-statistics` 아웃리치 시작 (법률 블로그, 노동 미디어)
- [ ] 변호사 리뷰어 1명 확보 → TrustBadge `isReviewed={true}` + Article 스키마 `reviewedBy` 추가
- [ ] Phase 2 전환 준비 — Vercel `SITEMAP_PHASE=2` 설정 (약 700페이지)

## 3개월 후

- [ ] 상위 10개 유입 쿼리 분석 → 콘텐츠 강화
- [ ] Featured Snippet 획득 여부 확인 (포지션 0)
- [ ] 백링크 현황 확인 (GSC Links 탭)
- [ ] Phase 3 전환 — Vercel `SITEMAP_PHASE=3` (전체 15,312페이지)
- [ ] 중개업체 → 로펌 직접 계약 협상 시작

---

## Sitemap Phase 설정

| SITEMAP_PHASE | 페이지 수 | 포함 내용 |
|---|---|---|
| 1 (기본) | ~200개 | 핵심 페이지 + 47개 주 홈 + 주요 5개 주 전체 (CA/TX/FL/NY/IL) |
| 2 | ~700개 | Phase 1 + 47×12 산업 페이지 564개 |
| 3 | ~15,312개 | 전체 47×12×N 부상 페이지 |

Vercel 환경변수에서 `SITEMAP_PHASE` 값을 변경 후 재배포.

---

## Core Web Vitals 목표

| 지표 | 목표 | 현재 |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | 측정 필요 |
| FID (First Input Delay) | < 100ms | 측정 필요 |
| CLS (Cumulative Layout Shift) | < 0.1 | 측정 필요 |

---

*최종 업데이트: 2026-03-30*
