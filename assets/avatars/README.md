# Approved FenUp X avatar collection v2

36 approved illustrations:18 students(9girls/9boys),6 scientists,6 animal explorers,6 space/technology characters. All selectable for free. The six previously approved source samples are included; the revised g06 has uncovered hair. Originals and approval sheets remain in the private review directory, outside this repository.

`v2/*-{96,192,384}.webp` are optimized derivatives of the exact approved PNGs. These108 variants total1,058,956bytes; the catalogue loads only the active category, with lazy96/192px thumbnails. Large384px variants are available for future detail views and are not fetched at startup. No homepage showcase was added.

`avatar-catalog.js` owns the36 permanent IDs and32 legacy aliases. Existing SVG data URLs embed their old ID in a gradient name and are resolved at display time. Unknown/broken values use the local approved default. There is no account migration.

The36 extensionless `fenupx-v2-*` image aliases at the site root contain the matching192px WebP. They intentionally preserve already-open/cached old clients that treat the newly stored permanent ID as an image URL. Absolute URLs saved by such clients resolve back to the same new ID. Keep these aliases until old-client/cache compatibility is no longer required; they add245,148bytes and are not loaded by the new catalogue.

The old inline SVG generator remains in script.js for compatibility reference; it is not used by the new selector. No old source visuals or student records were deleted. The secure score service, Firestore Rules and score configuration are unchanged. Display synchronization uses the existing avatar/profile service call only.

Validation: `npx playwright test tests/avatar-collection.spec.js` exercises draft/cancel/save/reload, legacy resolution, responsive/touch/keyboard behavior, existing profile/leaderboard circles, and all144 optimized/compatibility URLs. `node tests/avatar-live.cjs --production` is an explicitly gated, owner-authenticated synthetic account check; it cleans only its own test data. It does not play a competition or change the score service.
