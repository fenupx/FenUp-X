import { test, expect } from '@playwright/test';

test.describe('Eski İçerik Temizliği ve V6 İdempotent Göç (Migration)', () => {
  for (const revision of ['1', '2.0.0', '3.0.0']) {
    test(`Eski ${revision} yarım kalmış oturum V6'ya temizlenir, bildirim gösterilir ve yeni çalışmalar V6 kullanır`, async ({ page }) => {
      // Ağ isteklerini izle: Silinen eski içerik klasörlerine istek atılmamalı
      const legacyRequests = [];
      page.on('request', req => {
        const url = req.url();
        if (url.includes('/data/exam/content-v2/') || url.includes('/data/exam/content-v3/') || url.includes('/data/exam/assets/')) {
          legacyRequests.push(url);
        }
      });

      // Eski yarım kalmış oturum verisi hazırla
      const legacyIds = ['FB-7-1-1-E01', 'FB-7-1-1-E02', 'FB-7-1-1-E03', 'FB-7-1-3-E01', 'FB-7-1-5-E01', 'FB-7-2-1-E01', 'FB-7-2-1-E02'];
      await page.addInitScript(({ rev, ids }) => {
        if (!sessionStorage.getItem('migrated-seed-' + rev)) {
          localStorage.setItem('fenupx_cookie_consent', 'accepted');
          localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify({
            history: {},
            hasSelectedScope: true,
            currentStep: 'practice',
            studyCardIdx: 2,
            savedStudy: {
              cardIdx: 2,
              totalCards: 24,
              contentRevision: rev,
              visitedCards: ['C01', 'C02', 'C03'],
              updatedAt: 100
            },
            attempt: {
              contentRevision: rev,
              rubricRevision: rev,
              ids,
              questionPoints: Object.fromEntries(ids.map((id, i) => [id, i === 0 ? 10 : 15])),
              scoringVersion: 2,
              evaluationVersion: 2,
              answers: { [ids[0]]: 'Eski yarım cevap' },
              activeQuestionIndex: 0,
              routeKey: 'legacy-attempt-' + rev,
              status: 'in_progress',
              finished: false,
              updatedAt: 200
            }
          }));
          sessionStorage.setItem('migrated-seed-' + rev, '1');
        }
      }, { rev: revision, ids: legacyIds });

      await page.goto('/');
      await page.locator('#btn-yazili-modulu').click();
      await expect(page.locator('#exam-view-scope')).toBeVisible();
      await page.locator('#btn-scope-continue').click();

      // Seçim ekranı açılmalı ve idempotent göç bildirimi görünmeli
      await expect(page.locator('#exam-view-choice')).toBeVisible();
      const notice = page.locator('#exam-choice-migration-notice');
      await expect(notice).toBeVisible();
      await expect(notice).toContainText('İçerikler yenilendi. Yeni bir çalışma başlatabilirsin.');

      // Yarım kalmış eski çalışma temizlendiği için "Kaldığın Çalışmalar" kartı gösterilmemeli
      await expect(page.locator('#choice-saved-work-card')).not.toBeVisible();

      // Silinen eski yollara hiçbir istek atılmamış olmalı
      expect(legacyRequests).toHaveLength(0);

      // Sayfa yenilendiğinde göç bildirimi idempotent olmalı (tekrar gösterilmemeli)
      await page.reload();
      await expect(page.locator('#exam-view-scope')).toBeVisible();
      await page.locator('#btn-scope-continue').click();
      await expect(page.locator('#exam-view-choice')).toBeVisible();
      await expect(notice).not.toBeVisible();

      // Yeni Konu Çalışmaya Başla: Güncel V6 1. kartından başlamalı
      await page.locator('#btn-choice-go-study').click();
      await expect(page.locator('#scene-yazili')).toHaveClass(/content-v6/);
      await expect(page.locator('.study-counter-topic')).toContainText('Kart 1 / 17');

      // Yeni Provaya Başla: V6 7 soruluk yeni set açmalı
      await page.locator('#btn-study-back-choice').click();
      await page.locator('#btn-choice-go-practice').click();
      await page.locator('#exam-start-practice').click();
      await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.contentRevision)).toBe('6.0.0');
    });
  }
});
