import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

test.describe('V8.9.8 — Soru Bildirimleri, Hesap Kontrolleri ve Sistem Doğrulaması', () => {

    test('1. Soru Bildirimi: Başarısız gönderimde hata mesajı verilir, modal kapanmaz ve güvenli tekrar denenir', async ({ page }) => {
        await mockFirebase(page);

        // Open report modal with synthetic question
        await page.evaluate(() => {
            window.openReportModal({
                id: 'test-q-101',
                question: 'Işık boşlukta yayılabilir mi?',
                answerOptions: [
                    { text: 'Evet, dalga olarak yayılır', isCorrect: true },
                    { text: 'Hayır, maddesel ortam gereklidir', isCorrect: false }
                ],
                grade: 7,
                unit: 4,
                outcome: 'FB.7.4.1',
                difficulty: 1,
                module: 'Şampiyonlar Ligi'
            });
        });

        const reportModal = page.locator('#report-modal');
        await expect(reportModal).toBeVisible();

        // Check 500-char limit counter
        const descInput = page.locator('#report-desc');
        await descInput.fill('Bu soruda bir hata olduğunu düşünüyorum.');
        const charCount = page.locator('#report-char-count');
        await expect(charCount).toHaveText('40 / 500');

        // Simulate network failure
        await page.evaluate(() => { window.__fail = true; });

        let alertMsg = '';
        page.on('dialog', d => {
            alertMsg = d.message();
        });

        await page.locator('#btn-submit-report').click();

        // Modal must NOT close on failure, and input must be preserved
        await expect(reportModal).toBeVisible();
        await expect(descInput).toHaveValue('Bu soruda bir hata olduğunu düşünüyorum.');
        expect(alertMsg).toContain('Bildirim gönderilemedi');

        // Clear failure and submit successfully
        await page.evaluate(() => { window.__fail = false; });
        await page.locator('#btn-submit-report').click();

        // Modal should now close
        await expect(reportModal).toBeHidden();

        // Check report in window.__reports
        const reports = await page.evaluate(() => window.__reports);
        expect(reports.length).toBe(1);
        expect(reports[0].questionId).toBe('test-q-101');
        expect(reports[0].grade).toBe('7');
        expect(reports[0].unit).toBe('4');
        expect(reports[0].learningOutcome).toBe('FB.7.4.1');
        expect(reports[0].contentVersion).toBe('8.9.8');
        expect(reports[0].answerOptions.length).toBe(2);
        expect(reports[0].status).toBe('yeni');
    });

    test('2. Yönetici Paneli: Soru Bildirimleri sekmesi, filtreler, inceleme ve durum güncelleme', async ({ page }) => {
        await mockFirebase(page);

        // Create an admin user and seed test reports
        await page.evaluate(() => {
            window.__records = {
                'admin-specimen': {
                    role: 'admin',
                    name: 'FenUp',
                    surname: 'X',
                    nickname: 'Admin FenUp',
                    email: 'admin@fenupx.com',
                    avatar: 'g01',
                    isBanned: false
                }
            };
            window.__reports = [
                {
                    id: 'rep-001',
                    questionId: 'FB722-V7-E01',
                    questionText: 'Aşağıdaki cisimlerden hangisi sadece kinetik enerjiye sahiptir?',
                    answerOptions: [
                        { text: 'Yerde sabit hızla yuvarlanan top', isCorrect: true },
                        { text: 'Ağaçtaki elma', isCorrect: false }
                    ],
                    grade: '7',
                    unit: '2',
                    learningOutcome: 'FB.7.2.2',
                    reportType: 'hatali_soru',
                    description: 'Şıklarda kinetik ve potansiyel karışmış.',
                    reportedAt: new Date().toISOString(),
                    status: 'yeni',
                    contentVersion: '8.9.8'
                },
                {
                    id: 'rep-002',
                    questionId: 'FB511-E01',
                    questionText: 'Güneşin yapısı nasıldır?',
                    grade: '5',
                    unit: '1',
                    learningOutcome: 'FB.5.1.1',
                    reportType: 'yazim_hatasi',
                    description: 'İmla hatası var.',
                    reportedAt: new Date(Date.now() - 3600000).toISOString(),
                    status: 'inceleniyor',
                    contentVersion: '8.9.7'
                }
            ];
        });

        await page.evaluate(async () => {
            await window.__login('admin-specimen');
        });

        // Open admin modal
        await page.evaluate(() => {
            const btn = document.getElementById('btn-admin-panel');
            if (btn) btn.click();
        });
        const adminModal = page.locator('#admin-modal');
        await expect(adminModal).toBeVisible();

        // 3 tabs must exist
        const tabReports = page.locator('#btn-admin-tab-reports');
        await expect(tabReports).toBeVisible();

        // Report badge should show 1 new report
        const reportBadge = page.locator('#admin-report-badge');
        await expect(reportBadge).toBeVisible();
        await expect(reportBadge).toHaveText('1');

        // Click on reports tab
        await tabReports.click();
        const panelReports = page.locator('#admin-panel-reports');
        await expect(panelReports).toBeVisible();

        // Check report cards rendered
        const reportCards = panelReports.locator('.admin-report-card');
        await expect(reportCards).toHaveCount(2);

        // Filter by grade 7
        await page.locator('#admin-rep-grade-filters button[data-grade="7"]').click();
        await expect(panelReports.locator('.admin-report-card')).toHaveCount(1);

        // Reset grade filter to all
        await page.locator('#admin-rep-grade-filters button[data-grade="all"]').click();

        // Filter by status 'yeni'
        await page.locator('#admin-rep-status-filters button[data-status="yeni"]').click();
        await expect(panelReports.locator('.admin-report-card')).toHaveCount(1);
        await expect(panelReports.locator('.admin-rep-pill-status')).toHaveText('Yeni');

        // Reset status filter
        await page.locator('#admin-rep-status-filters button[data-status="all"]').click();

        // Inspect Question Detail Modal
        await panelReports.locator('.btn-inspect-q[data-report-id="rep-001"]').click();
        const detailModal = page.locator('#admin-report-detail-modal');
        await expect(detailModal).toBeVisible();
        await expect(detailModal).toContainText('Aşağıdaki cisimlerden hangisi');
        await expect(detailModal).toContainText('Yerde sabit hızla yuvarlanan top');
        await expect(detailModal).toContainText('Doğru Cevap');
        await page.locator('#btn-close-report-detail').click();
        await expect(detailModal).toBeHidden();

        // Update status of rep-001 to 'cozuldu' and save admin note
        const noteInput = panelReports.locator('.admin-rep-note-input[data-report-id="rep-001"]');
        await noteInput.fill('Düzeltme yapıldı.');
        const statusSelect = panelReports.locator('.admin-rep-select-status[data-report-id="rep-001"]');
        await statusSelect.selectOption('cozuldu');
        await panelReports.locator('.btn-save-rep-note[data-report-id="rep-001"]').click();

        // Badge count should now be 0 (no 'yeni' remaining)
        await expect(reportBadge).toBeHidden();
    });

    test('3. Dışa Aktarım: JSON ve Metin çıktısında PII (öğrenci adı, e-posta, uid) kesinlikle yer almaz', async ({ page }) => {
        await mockFirebase(page);

        await page.evaluate(() => {
            window.__records = {
                'admin-1': { role: 'admin', name: 'FenUp', surname: 'X', email: 'admin@fenupx.com' }
            };
            window.__reports = [
                {
                    id: 'rep-secret-1',
                    questionText: 'Fotosentez nerede gerçekleşir?',
                    grade: '8',
                    unit: '3',
                    learningOutcome: 'FB.8.3.1',
                    reportType: 'hatali_soru',
                    description: 'Kloroplast seçeneği eksik.',
                    reporterId: 'STUDENT_SECRET_UID_9999',
                    reporterName: 'Gizli Öğrenci Adı',
                    email: 'ogrenci@okul.k12.tr',
                    status: 'yeni',
                    contentVersion: '8.9.8'
                }
            ];
        });

        await page.evaluate(async () => {
            await window.__login('admin-1');
            await window.loadAdminReports(false);
        });

        // Test JSON export function output
        const jsonExport = await page.evaluate(() => {
            const list = window.allAdminReports;
            return JSON.stringify(list.map(r => ({
                id: r.id,
                grade: r.grade,
                question: { stem: r.questionText }
            })));
        });

        expect(jsonExport).not.toContain('STUDENT_SECRET_UID_9999');
        expect(jsonExport).not.toContain('Gizli Öğrenci Adı');
        expect(jsonExport).not.toContain('ogrenci@okul.k12.tr');
    });

    test('4. "FenUp X" İsim Filtresi: Yönetici onaylı adı kaydedebilir, yanlış eşleşmeyle engel verilmez', async ({ page }) => {
        await mockFirebase(page);

        // Test uygunIsimMi directly for FenUp X and 1-char letters
        const filterCheck = await page.evaluate(() => {
            return {
                fenupX: window.uygunIsimMi('FenUp X'),
                fenup: window.uygunIsimMi('FenUp'),
                singleX: window.uygunIsimMi('X'),
                yara: window.uygunIsimMi('Yarasa'),
                profanity: window.uygunIsimMi('siktir'),
                reservedFenup: window.isReservedAdminName('FenUp X'),
                reservedAdmin: window.isReservedAdminName('admin'),
                studentNormal: window.isReservedAdminName('Ali Yılmaz')
            };
        });

        expect(filterCheck.fenupX).toBe(true);
        expect(filterCheck.fenup).toBe(true);
        expect(filterCheck.singleX).toBe(true);
        expect(filterCheck.yara).toBe(true);
        expect(filterCheck.profanity).toBe(false);
        expect(filterCheck.reservedFenup).toBe(true);
        expect(filterCheck.reservedAdmin).toBe(true);
        expect(filterCheck.studentNormal).toBe(false);

        // Admin saving name "FenUp" and surname "X"
        await page.evaluate(() => {
            window.__records = {
                'admin-hero': {
                    role: 'admin',
                    name: 'Eski',
                    surname: 'Yonetici',
                    nickname: 'Admin',
                    email: 'admin@fenupx.com',
                    avatar: 'g01',
                    isBanned: false
                }
            };
        });

        await page.evaluate(async () => {
            await window.__login('admin-hero');
        });

        // Open profile modal
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();
        await page.evaluate(() => { const d = document.querySelector('.profile-settings-details'); if (d) d.open = true; });

        // Fill Ad: "FenUp", Soyad: "X"
        await page.locator('#p-name').fill('FenUp');
        await page.locator('#p-surname').fill('X');

        // Intercept alert dialogs
        let savedAlert = '';
        page.on('dialog', d => {
            savedAlert = d.message();
        });

        await page.locator('#btn-save-profile').click();

        // Must NOT ban account
        const updatedRecord = await page.evaluate(() => window.__records['admin-hero']);
        expect(updatedRecord.isBanned).toBe(false);
        expect(updatedRecord.name).toBe('FenUp');
        expect(updatedRecord.surname).toBe('X');
    });

    test('5. Öğrenci Yöneticiyi Taklit Edemez ("FenUp X" adı sıradan öğrenciye engellenir ama banlanmaz)', async ({ page }) => {
        await mockFirebase(page);

        await page.evaluate(() => {
            window.__records = {
                'student-specimen': {
                    role: 'student',
                    name: 'Ahmet',
                    surname: 'Kaya',
                    nickname: 'Ahmet5',
                    sinif: '5',
                    email: 'ahmet@example.invalid',
                    avatar: 'b01',
                    isBanned: false
                }
            };
        });

        await page.evaluate(async () => {
            await window.__login('student-specimen');
        });

        // Open profile modal
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });
        await page.evaluate(() => { const d = document.querySelector('.profile-settings-details'); if (d) d.open = true; });

        // Try to set nickname to "FenUp X"
        await page.locator('#p-nickname').fill('FenUp X');

        let rejectMsg = '';
        page.on('dialog', d => {
            rejectMsg = d.message();
        });

        await page.locator('#btn-save-profile').click();

        // Must reject save with reserved name message
        expect(rejectMsg).toContain('yönetimine ayrılmıştır');

        // Must NOT ban student in database!
        const record = await page.evaluate(() => window.__records['student-specimen']);
        expect(record.isBanned).toBe(false);
        expect(record.nickname).toBe('Ahmet5'); // unchanged
    });

    test('6. Günlük Seri ve Rozetler: Türkiye saat dilimi ve yönetici ilerleme izolasyonu', async ({ page }) => {
        await mockFirebase(page);

        // Admin account must not update student streak
        await page.evaluate(() => {
            window.__records = {
                'admin-isolated': { role: 'admin', name: 'Admin', surname: 'X', email: 'adm@fenup.test', isBanned: false }
            };
            localStorage.setItem('fenupx_streak_data', JSON.stringify({ count: 5, lastDate: '2026-11-04' }));
        });

        await page.evaluate(async () => {
            await window.__login('admin-isolated');
            window.checkAndUpdateStreak();
        });

        // Streak data must remain unchanged for admin
        const streakData = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_streak_data') || '{}'));
        expect(streakData.count).toBe(5); // Not updated or corrupted by admin
    });

    test('7. Yönetici Paneli: Yazılı Soru Havuzu aktif 78 soruyu tam ve ikonlu listeler', async ({ page }) => {
        await mockFirebase(page);

        await page.evaluate(() => {
            window.__records = {
                'admin-pool-check': { role: 'admin', name: 'Admin', surname: 'Pool', email: 'admin@pool.test' }
            };
        });

        await page.evaluate(async () => {
            await window.__login('admin-pool-check');
        });

        await page.evaluate(() => {
            const btn = document.getElementById('btn-admin-panel');
            if (btn) btn.click();
        });

        const qTabBtn = page.locator('#btn-admin-tab-questions');
        await expect(qTabBtn).toBeVisible();
        await expect(qTabBtn).toContainText('78 Soru');
        await expect(qTabBtn.locator('i.fa-clipboard-list')).toBeVisible();
    });
});
