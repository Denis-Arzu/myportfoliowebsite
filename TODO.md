# TODO

## Existing
- [ ] Fix products page layout so content is not hidden by viewport-locked containers.
- [ ] Redesign products listing into two premium card components aligned with app theme.
- [ ] Validate spacing/scroll behavior between products section and footer.

## SEO/GEO Implementation
- [x] Update root metadata in `app/layout.tsx` with requested description and `/icon.svg` favicon.
- [x] Add `components/ui/StructuredData.tsx` with Organization + SoftwareApplication JSON-LD.
- [x] Mount `<StructuredData />` in root layout.
- [x] Update `app/sitemap.ts` to include all important routes and homepage anchor URLs.
- [x] Verify `public/robots.txt` points to sitemap and allows crawling.
