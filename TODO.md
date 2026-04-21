# UI Refinement — Capabilities & Standards Premium Bento Upgrade

## Step 1: Capabilities section cleanup and redesign (`Myskills.tsx`)
- [ ] Remove circular progress percentage indicator from cards.
- [ ] Remove unused proficiency data fields/components tied to percentage arc.
- [ ] Upgrade grid to true full-width bento layout (`lg:grid-cols-12` with balanced spans).
- [ ] Add minimal premium lighting (subtle radial glow + top sheen + refined border glow).

## Step 2: Standards section cleanup and redesign (`EngineeringStandards.tsx`)
- [ ] Remove circular performance percentage indicator from cards.
- [ ] Remove unused system performance data fields/components tied to percentage arc.
- [ ] Upgrade grid to full-width bento layout matching capabilities section.
- [ ] Add subtle premium lighting and consistent high-end card depth.

## Step 3: Global wording cleanup in products-facing content
- [ ] Update `/products` supporting copy to replace US-specific terms with global-neutral language:
  - [ ] `CaseStudies.tsx`
  - [ ] `ActiveBuilds.tsx`

## Step 4: Final pass
- [ ] Ensure no duplicated/unused code remains after removing progress arc components.
- [ ] Ensure spacing and grid fill behavior looks consistent across `/capabilities` and `/standards`.
- [ ] Keep `GlobalImpact` label as `Markets: US & Global` per latest approved request.
