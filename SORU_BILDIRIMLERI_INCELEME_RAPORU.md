# FENUP X — SORU BİLDİRİMLERİ İNCELEME, KAYNAK KONTROLÜ VE DOĞRULAMA RAPORU
**Tarih:** 5 Kasım 2026  
**Durum:** Kaynak Kontrolü ve Pedagojik İyileştirme Tamamlandı (Kullanıcı Tarafından "İnceleniyor" Yapıldı, İki Eski Kayıt Korundu)  
**Gizlilik Düzeyi:** Kişisel Verilerden (PII: İsim, E-posta, UID) Tamamen Arındırılmış  

---

## 1. İNCELEME KAPSAMI VE METODOLOJİ

- **Kapsam Dışı Tutulan Eski Kayıtlar:** 11 Mayıs 2026 ve 13 Mayıs 2026 tarihli iki eski bildirim, kullanıcı talimatı doğrultusunda bu içerik incelemesinin dışında tutulmuştur. Bu kayıtlar veri tabanından silinmemiş, otomatik çözüldü olarak işaretlenmemiş ve veri tabanında olduğu gibi korunmuştur.
- **İncelemeye Alınan Bildirimler:** Kullanıcı tarafından incelenerek durumu "İnceleniyor" yapılan 30 Ekim 2026 ve 1 Kasım 2026 tarihli iki soru bildirimi.
- **Önemli Pedagojik İlke:** Bir sorunun öğrenci tarafından bildirilmiş olması tek başına o sorunun veya cevap anahtarının hatalı olduğunu kanıtlamaz. Öğrenciler kavram yanılgıları, dikkatsizlik veya soru kökünü yanlış yorumlama sebebiyle de bildirim gönderebilmektedir. Bu nedenle doğru cevap anahtarı bildirildi diye doğrudan değiştirilmemiştir.
- **Soru Havuzu ve Kimlik Yapısı:** Soru havuzu JSON dosyalarında (`6_sinif_sorular.json` ve `7_sinif_sorular.json`) yerel veritabanı ID alanı bulunmamaktadır. `sl-g6-u1-q25` veya `sl-g7-u1-q16` gibi belirteçler havuzdaki dizi sırasına göre dinamik üretilen konumsal belirteçlerdir; kalıcı bir veritabanı anahtarı değildir. Sistem yönetici detayında bunu `Havuz Konumu: 7. Sınıf, Ünite 1 (Sıra: #16 - Yerel ID Yok)` şeklinde açıkça belirtmektedir.
- **Görsel Durumu:** Şampiyonlar Ligi bilgi yarışması sorularında kural gereği görsel bulunmamaktadır; sisteme görsel altyapısı eklenmemiştir.

---

## 2. BİLDİRİM #1: AY TUTULMASI SÜRESİ (6. SINIF)

### İlgili MEB Ders Kitabı Künyesi
- **Ders Kitabı:** Millî Eğitim Bakanlığı Ortaokul ve İmam Hatip Ortaokulu Fen Bilimleri 6. Sınıf Ders Kitabı (1. Kitap)
- **Yazarlar:** Dr. Halil Kardeş, Ali Aydın, Ayşe Güngör Sönmez, Latife Nur Canan, Mehmet Emin Topak, Tuğba Ünüvar Başböğer, Yusuf Mehmet Bağcı
- **Yayın Bilgisi:** MEB Yayınları No: 10249, Ders Kitapları Dizisi No: 2254, Baskı 2025/2026
- **ISBN:** 978-975-11-8762-8
- **Talim ve Terbiye Kurulu Onayı:** 29.05.2025 tarih ve 133256060 sayılı karar (Türkiye Yüzyılı Maarif Modeli)
- **İncelenen Sayfalar:** Basılı Kitap Sayfa 34 ve Sayfa 36; PDF Dosyası Sayfa 36 ve Sayfa 38
- **Ders Kitabı Metin Kanıtı:**
  - *Sayfa 34:* "Ay tutulması, Güneş tutulmasına göre daha uzun sürer ve Dünya üzerinde daha geniş bir alanda gözlemlenir."
  - *Sayfa 36:* "29 Mart 2006 tarihinde yaklaşık 4 dakikalık 'Tam Güneş tutulması'na şahit oldu..."

### Bildirim ve Havuz Bilgisi
| Alan | Bilgi |
| :--- | :--- |
| **Bildirim Tarihi** | 30 Ekim 2026 |
| **Modül** | Şampiyonlar Ligi |
| **Sınıf Seviyesi** | 6. Sınıf |
| **Ünite** | Ünite 1: Güneş Sistemi ve Tutulmalar (Kazanım: FB.6.1.3) |
| **Zorluk Derecesi** | 1 (Temel Düzey) |
| **Havuz Konumu** | 6. Sınıf, Ünite 1 (Soru Havuzu İndeksi: 24, Yerel ID Yok) |
| **İçerik Kaynağı** | **Güncel havuzdaki eşleşme** *(Eski bildirim kaydı; anlık snapshot değildir)* |
| **İçerik Sürümü** | Sürüm bilinmiyor (Eski bildirim anında içerik sürümü saklanmamıştır) |
| **Mevcut Durum** | `inceleniyor` *(Kullanıcı tarafından güncellendi)* |

### Soru Metni, Şıklar ve İpucu
- **Soru Kökü:** "Ay tutulması yaklaşık olarak ne kadar süre gözlemlenebilir?"
- **Seçenekler:**
  - **[A] Birkaç saat** `[SİSTEMDE İŞARETLİ DOĞRU CEVAP]`
  - **[B] Birkaç dakika**
  - **[C] Saniyelerle**
  - **[D] Tüm yıl**
- **Açıklama / İpucu:** "Dünya'nın gölgesi büyük olduğu için uzun süre takip edilebilir."

### Bilimsel, Pedagojik ve Süre Ayrımı Değerlendirmesi
1. **Toplam Süre ile Tam Evre Ayrımı:**
   - Ay tutulmasında Ay'ın Dünya'nın tam gölge konisine girmesi (tam tutulma evresi) yaklaşık 1 ila 1,5 saat sürer.
   - Parçalı ve yarı gölge evreleri de dahil edildiğinde bir Ay tutulmasının Dünya'dan çıplak gözle baştan sona gözlemlenme süresi **3 ila 5 saat ("Birkaç saat")** sürmektedir.
   - Güneş tutulmasında ise Ay'ın gölgesi Dünya yüzeyinde dar bir koridor çizdiği için tam Güneş tutulması yalnız **birkaç dakika (en fazla 7,5 dakika, Türkiye'deki 2006 tutulmasında 4 dakika)** gözlemlenebilir.
2. **Kazanım Kapsamı ve Netlik:** MEB 6. sınıf kazanımı (FB.6.1.3), öğrencilerin Güneş ve Ay tutulmalarını süre, konum ve gözlem alanı açısından karşılaştırmasını hedefler. Ders kitabında da açıkça Ay tutulmasının Güneş tutulmasından çok daha uzun sürdüğü vurgulanmaktadır. Soru kökünde toplam süre ile evre süresi arasında bir ikilem bulunmamakta; şıklar ("Birkaç saat", "Birkaç dakika", "Saniyelerle", "Tüm yıl") farklı zaman mertebelerini ölçmektedir.
3. **Sonuç:** Doğru cevap olan **[A] Birkaç saat** bilimsel, pedagojik ve MEB müfredatı açısından %100 doğrudur. Soru kökünde veya cevap anahtarında bir değişiklik yapılmamıştır.

---

## 3. BİLDİRİM #2: TELESKOPLARDA TEMEL OPTİK ARAÇLAR (7. SINIF)

### İlgili MEB Ders Kitabı Künyesi
- **Ders Kitabı:** Millî Eğitim Bakanlığı Ortaokul ve İmam Hatip Ortaokulu Fen Bilimleri 7. Sınıf Ders Kitabı (1. Kitap)
- **Yazarlar:** Dr. Nurhan Yıldız, Betül Özcan, Emre Yıldıra, Esma Özlem Ünlü, İrem Aybacı. Editör: Prof. Dr. Fatma Taşkın Ekici
- **Yayın Bilgisi:** MEB Yayınları No: 10761, Ders Kitapları Dizisi No: 2511, Baskı 2026/2027
- **ISBN:** 978-975-11-9893-8
- **Talim ve Terbiye Kurulu Onayı:** 13.07.2026 tarih ve 164125594 sayılı karar (Türkiye Yüzyılı Maarif Modeli)
- **İncelenen Sayfalar:** Basılı Kitap Sayfa 22, 23, 24 ve Sayfa 29; PDF Dosyası Sayfa 23, 24, 25 ve Sayfa 30
- **Ders Kitabı Metin Kanıtı:**
  - *Sayfa 22-24 (PDF s. 23-25):* Optik teleskoplar ışığı toplayıp odaklamak için mercek veya ayna kullanır. Yer tabanlı optik teleskoplara Doğu Anadolu Gözlemevi (DAG) 4 metre çaplı aynası örnek verilir.
  - *Sayfa 29 (PDF s. 30):* "Performans Görevi: Uzay Gözlem Araçları Modeli": Öğrencilerden basit ev gereçleri (karton rulo, iki adet ince/kalın kenarlı mercek) kullanarak bir teleskop modeli yapmaları istenir. Bu basit modelde ayna kullanılmamaktadır.

### Bildirim ve Havuz Bilgisi
| Alan | Bilgi |
| :--- | :--- |
| **Bildirim Tarihi** | 1 Kasım 2026 |
| **Modül** | Şampiyonlar Ligi |
| **Sınıf Seviyesi** | 7. Sınıf |
| **Ünite** | Ünite 1: Güneş Sistemi ve Ötesi - Uzay Araştırmaları (Kazanım: FB.7.1.1, FB.7.1.2) |
| **Zorluk Derecesi** | 1 (Temel Düzey) |
| **Havuz Konumu** | 7. Sınıf, Ünite 1 (Soru Havuzu İndeksi: 15, Yerel ID Yok) |
| **İçerik Kaynağı** | **Güncel havuzdaki eşleşme** *(Eski bildirim kaydı; anlık snapshot değildir)* |
| **İçerik Sürümü** | Sürüm bilinmiyor (Eski bildirim anında içerik sürümü saklanmamıştır) |
| **Mevcut Durum** | `inceleniyor` *(Kullanıcı tarafından güncellendi)* |

### İnceleme, Çelişki Tespiti ve Pedagojik İyileştirme
1. **Basit Model ile Genel Optik Araç Çelişkisi:**
   - MEB 7. sınıf ders kitabının 29. sayfasındaki "Uzay Gözlem Araçları Modeli" performans görevinde öğrencilere yaptırılan basit teleskop modeli sadece **merceklerden** oluşmaktadır (ayna kullanılmaz).
   - "Işığı kırarak veya yansıtarak odaklama" ise tüm **optik teleskopların (kırılmalı ve yansıtmalı)** genel çalışma ilkesidir.
   - Soru kökündeki *"Basit bir teleskop modelinde..."* ifadesi, okulda model yapan öğrenci için çelişki oluşturmakta ve öğrenci *"Modelde ayna yoktu"* yanılgısıyla şıklarda tereddüt edebilmektedir.
2. **İpucu Eleştirisi:**
   - Orijinal ipucu *"Teleskopların yapısında ışığı toplayıp büyütmek için ince kenarlı mercekler veya çukur aynalar kullanılır."* diyerek doğrudan "Mercek ve aynalar" doğru cevabını çözmeden ele vermekteydi.
   - İpucu, cevabı doğrudan fısıldamadan optik araç kavramını düşündürecek pedagojik bir dille yenilenmiştir.
3. **Cevap Anahtarının Korunması:**
   - Doğru cevap olan **[A] Mercek ve aynalar** KESİNLİKLE KORUNMUŞTUR; değiştirilmemiştir. Çeldiriciler (pil/kablo, motor/pervane, mıknatıs/bobin) optik araç niteliği taşımamaktadır.

### Önce / Sonra Karşılaştırma Tablosu

| Bileşen | Önceki Durum | İyileştirilmiş Durum | Gerekçe |
| :--- | :--- | :--- | :--- |
| **Soru Kökü** | "Basit bir teleskop modelinde uzak gök cisimlerinden gelen ışığı kırarak veya yansıtarak bir noktada odaklayan temel optik araçlar nelerdir?" | **"Optik teleskoplarda uzak gök cisimlerinden gelen ışığı kırarak veya yansıtarak bir noktada odaklayan temel araçlar aşağıdakilerden hangisidir?"** | Ders kitabı s. 29'daki basit model çelişkisi giderildi; optik teleskopların genel sınıflandırmasıyla (kırılmalı/yansıtmalı) tam uyumlu hale getirildi. |
| **Açıklama / İpucu** | "Teleskopların yapısında ışığı toplayıp büyütmek için ince kenarlı mercekler veya çukur aynalar kullanılır." | **"Gök cisimlerinden gelen ışığı toplamak için ışığı kıran ya da yansıtan saydam ve yansıtıcı optik araçlardan yararlanılır."** | Çözümü doğrudan ele veren ifade yerine kavramsal rehberlik sağlayan pedagojik bir rehber haline getirildi. |
| **[A] Şıkkı (Doğru)** | **Mercek ve aynalar** | **Mercek ve aynalar** | **Aynen korundu (Değişmedi).** |
| **[B] Şıkkı** | Pil ve kablolar | Pil ve kablolar | Aynen korundu. |
| **[C] Şıkkı** | Motor ve pervaneler | Motor ve pervaneler | Aynen korundu. |
| **[D] Şıkkı** | Mıknatıs ve bobinler | Mıknatıs ve bobinler | Aynen korundu. |

---

## 4. BİLDİRİM AKIŞI VE SİSTEM DOĞRULAMASI

1. **Bildirim Sayacı:**
   - Sayacın yalnızca `status === 'yeni'` olan kayıtları filtrelediği teyit edilmiştir.
   - Kullanıcının "İnceleniyor" durumuna aldığı 30 Ekim ve 1 Kasım kayıtları yeni bildirim sayacından doğru biçimde düşmektedir.
2. **Filtreler ve Kalıcılık:**
   - "Tümü", "Yeni", "İnceleniyor" ve "Çözüldü" sekmeleri eksiksiz çalışmaktadır.
   - Durum veya yönetici inceleme notu kaydedildiğinde veritabanına `updateDoc` ile yazılmakta; sekme değiştirildiğinde veya sayfa yenilendiğinde güncel durum korunmaktadır.
3. **Liste ve Detay Penceresi Eşzamanlılığı:**
   - Liste kartındaki durum etiketi ile detay penceresi başlığındaki durum etiketi birebir aynı Türkçe etiketleri (`Yeni`, `İnceleniyor`, `Çözüldü`) göstermektedir.
   - Yönetici inceleme notu kaydedilmişse detay modalında gösterilmekte; henüz not eklenmemişse *"Henüz bir inceleme notu eklenmedi."* ifadesiyle açıkça belirtilmektedir.
   - Havuzdaki soru kökü revize edilmişse, detay modalı hem güncel havuzdaki netleştirilmiş soru kökünü hem de öğrencinin bildirdiği tarihteki orijinal soru metnini karşılaştırmalı olarak sunmaktadır.
4. **Hata Durumunda Arayüz Koruması:**
   - Ağ veya izin hatası durumunda kullanıcıya anlaşılır hata mesajı verilmekte (`alert`); arayüzdeki durum seçimi başarısız olan yeni değere geçmeyip veritabanındaki geçerli duruma geri dönmektedir (`catch` bloğunda `renderAdminReports()`).
5. **Otomatik Test Kapsamı:**
   - `tests/admin-reports-and-account.spec.js` test paketine eklenen izole senaryolarla 11 test hem masaüstü (`desktop-1366`) hem mobil (`mobile-safari-iphone-390`) ortamında %100 başarıyla geçmiştir.
   - Testlerde kesinlikle gerçek üretim veritabanı veya öğrenci kayıtları kullanılmamış; izole mock verilerle uçtan uca doğrulanmıştır.
