# 🧪 FenUp X — İnteraktif Deney ve Sanal Bilim Laboratuvarı Envanteri

Bu belge, MEB Türkiye Yüzyılı Maarif Modeli (TYMM) 5, 6 ve 7. sınıf fen bilimleri ders kitapları ve resmi öğretim programı kazanımları taranarak hazırlanmıştır. Salt el becerisi veya el işi gerektiren (hamur yoğurma, karton kesme, afiş boyama vb.) etkinlikler elenmiş; doğrudan **ölçüm, gözlem, neden-sonuç ve değişken kontrolü (bağımlı, bağımsız, sabit tutulan değişken)** barındıran ve **saf JavaScript Canvas 2D / SVG** ile gerçek zamanlı simülasyona dönüştürülebilecek **26 adet interaktif deney** standart şablonla belgelenmiştir.

---

## 📑 İÇİNDEKİLER

1. [5. Sınıf İnteraktif Deney Havuzu (8 Deney)](#1-5-sınıf-interaktif-deney-havuzu)
2. [6. Sınıf İnteraktif Deney Havuzu (9 Deney)](#2-6-sınıf-interaktif-deney-havuzu)
3. [7. Sınıf İnteraktif Deney Havuzu (9 Deney)](#3-7-sınıf-interaktif-deney-havuzu)
4. [Teknik Modül Mimarisi ve Arayüz Tasarımı](#4-teknik-modül-mimarisi-ve-arayüz-tasarımı)
5. [Pilot Deney Tavsiyesi (Faz 1 Uygulaması)](#5-pilot-deney-tavsiyesi-faz-1-uygulaması)

---

## 1. 5. Sınıf İnteraktif Deney Havuzu

### Deney 5.1: Ay'ın Evreleri ve Yörünge Konum Simülatörü
- **İlgili Sınıf & Ünite:** 5. Sınıf / 1. Ünite (Gökyüzündeki Komşularımız ve Biz)
- **Maarif Modeli Kazanımı:** `FB.5.1.2`, `FB.5.1.3`
- **Ders Kitabı Referansı:** 1. Kitap, s. 28–39 (Etkinlik Noktası: Ay'ın Değişen Yüzü)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Ay'ın Dünya çevresindeki yörünge konumu (Açı: $0^\circ - 360^\circ$ dairesel slider).
  * **Bağımlı Değişken:** Dünya'dan görünen aydınlık alan şekli ve evre adı (Yeni Ay, Hilal, İlk Dördün, Şişkin Ay, Dolunay, Son Dördün).
  * **Sabit Tutulan Değişkenler:** Güneş ışınlarının geliş yönü (soldan paralel), Dünya'nın konumu, Ay'ın kendi ekseni ve Dünya etrafındaki dönme süresinin eşitliği.
- **İnteraktivite ve Fizik Motoru:**
  * Ekran ikiye bölünür: Sol tarafta uzaydan üstten bakış (Güneş, Dünya ve yörüngede sürüklenebilen Ay), sağ tarafta Dünya'daki teleskoptan gerçek zamanlı görünüm.
  * Kullanıcı Ay'ı yörüngesinde sürükledikçe veya "Otomatik Döndür (1 Ay)" butonuna bastıkça teleskop penceresinde gölge açısı anlık hesaplanır ve evre etiketi güncellenir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Yörünge Açısı | Ay'ın Uzaydaki Konumu | Dünya'dan Görünen Şekil | Evre Adı |
| :---: | :---: | :---: | :---: |
| $0^\circ$ | Güneş ile Dünya arasında | Tamamen karanlık daire | Yeni Ay |
| $90^\circ$ | Dünya'nın üst/kuzey ekseninde | D harfi şeklinde aydınlık | İlk Dördün |
| $180^\circ$ | Güneş'e zıt tarafta | Tamamen parlak daire | Dolunay |
| $270^\circ$ | Dünya'nın alt/güney ekseninde | Ters D harfi şeklinde aydınlık | Son Dördün |

---

### Deney 5.2: Dinamometre ile Yay Esnekliği ve Kuvvet Ölçümü Laboratuvarı
- **İlgili Sınıf & Ünite:** 5. Sınıf / 2. Ünite (Kuvveti Tanıyalım)
- **Maarif Modeli Kazanımı:** `FB.5.2.1`, `FB.5.2.2`
- **Ders Kitabı Referansı:** 1. Kitap, s. 60–73 (Etkinlik Noktası: Yayları Esnetelim, Kuvveti Ölçelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Dinamometreye asılan ağırlık miktarı ($1\text{ N}, 2\text{ N}, 5\text{ N}, 10\text{ N}$) ve yay sertliği / kalınlığı ($k_1$ ince yay, $k_2$ kalın yay).
  * **Bağımlı Değişken:** Yayın uzama miktarı ($\Delta x$, birim bölme veya santimetre).
  * **Sabit Tutulan Değişkenler:** Yer çekimi ortamı (Dünya), yayın esneklik sınırı, dinamometre gövdesi.
- **İnteraktivite ve Fizik Motoru:**
  * 2D Canvas üzerinde asılı duran dinamometre; kullanıcı sağdaki ağırlık paletinden $1\text{ N}$'luk diskleri sürükleyip kancaya takar.
  * Hooke Kanunu ($F = k \cdot x$) simüle edilir. Yay elastik olarak salınır ve durur. Cetvel üzerinde bölme uzaması hassas okunur. Esneklik sınırı aşıldığında yayın kalıcı deforme olduğu animasyonla gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Asılan Ağırlık ($F$) | İnce Yay Uzaması ($\Delta x_1$) | Kalın Yay Uzaması ($\Delta x_2$) | Bölme Başına Kuvvet |
| :---: | :---: | :---: | :---: |
| $1\text{ N}$ | $1\text{ cm}$ (1 bölme) | $0.5\text{ cm}$ | $1\text{ N / cm}$ |
| $2\text{ N}$ | $2\text{ cm}$ (2 bölme) | $1.0\text{ cm}$ | $1\text{ N / cm}$ |
| $5\text{ N}$ | $5\text{ cm}$ (5 bölme) | $2.5\text{ cm}$ | $1\text{ N / cm}$ |
| $10\text{ N}$ | $10\text{ cm}$ (Esneklik Sınırı!) | $5.0\text{ cm}$ | $1\text{ N / cm}$ |

---

### Deney 5.3: Sürtünme Kuvveti ve Zemin Cinsinin Harekete Etkisi
- **İlgili Sınıf & Ünite:** 5. Sınıf / 2. Ünite (Kuvveti Tanıyalım)
- **Maarif Modeli Kazanımı:** `FB.5.2.4`
- **Ders Kitabı Referansı:** 1. Kitap, s. 80–91 (Etkinlik Noktası: Yüzeyleri Değiştirelim, Yolu Ölçelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Yatay zemin türü (Buz pisti $\mu=0.05$, Parlak parke $\mu=0.2$, Zımpara kağıdı $\mu=0.5$, Yün halı $\mu=0.7$).
  * **Bağımlı Değişken:** Eğik düzlemden kayan takozun yatayda durana kadar aldığı yol ($x$, cm) ve hareket süresi ($t$, s).
  * **Sabit Tutulan Değişkenler:** Eğik düzlemin açısı ($30^\circ$), yüksekliği ($h=20\text{ cm}$), takozun kütlesi ($100\text{ g}$).
- **İnteraktivite ve Fizik Motoru:**
  * Kullanıcı eğik düzlemin tepesindeki takozu serbest bırakır. Takoz hızlanarak yatay zemine geçer.
  * Yatay zeminde sürtünme ivmesi $a = -\mu \cdot g$ ile takoz yavaşlar ve durur. Cetvel üzerinde durduğu nokta işaretlenir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Deney No | Zemin Türü | Sürtünme Özelliği | Alınan Yol ($x$) | Durma Süresi ($t$) |
| :---: | :---: | :---: | :---: | :---: |
| 1 | Buz Pisti | Çok az pürüzlü / Kaygan | $180\text{ cm}$ | $4.2\text{ s}$ |
| 2 | Parlak Parke | Az pürüzlü | $95\text{ cm}$ | $2.3\text{ s}$ |
| 3 | Zımpara Kağıdı | Çok pürüzlü | $35\text{ cm}$ | $1.1\text{ s}$ |
| 4 | Yün Halı | Aşırı pürüzlü | $18\text{ cm}$ | $0.6\text{ s}$ |

---

### Deney 5.4: Işığın Doğrusal Yayılması ve Saydamlık Filtresi
- **İlgili Sınıf & Ünite:** 5. Sınıf / 4. Ünite (Işığın Dünyası)
- **Maarif Modeli Kazanımı:** `FB.5.4.1`, `FB.5.4.2`
- **Ders Kitabı Referansı:** 2. Kitap, s. 16–29 (Etkinlik Noktası: Işığın Yolu ve Engeller)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Optik ray üzerine yerleştirilen levhanın optik geçirgenliği (Hava, Saydam Cam, Buzlu Cam, Yağlı Kağıt, Mukavva/Demir Plaka) ve delikli kartların hizalanma durumu (doğrusal / kaçık).
  * **Bağımlı Değişken:** Karşıdaki ekrana ulaşan ışık şiddeti (Lüks metre) ve ışık noktasının netliği.
  * **Sabit Tutulan Değişkenler:** Işık kaynağının lümen değeri, kaynak-ekran mesafesi.
- **İnteraktivite ve Fizik Motoru:**
  * Lazer/el feneri açılır; aradaki 3 adet delikli kart sürüklenerek delikler hizalanır. Delikler aynı doğrultuda iken ışık karşıya geçer; biri yana çekildiğinde ışık kesilir (ışığın doğrusal yayılma ispatı).
  * Araya farklı maddeler konulduğunda ışık ışınlarının kırılmadan geçişi, saçılarak geçişi veya tamamen soğurulması render edilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Malzeme | Delik Hizası | Ekrandaki Işık Durumu | Madde Sınıflandırması |
| :---: | :---: | :---: | :---: |
| Düz Cam | Doğrusal | Net ve tam parlak | Saydam Madde |
| Yağlı Kağıt | Doğrusal | Dağınık ve loş | Yarı Saydam Madde |
| Tahta Levha | Doğrusal | Sıfır ışık / Karanlık | Opak Madde |
| Karton Delik Kayık | Hizalanmamış | Işık engellendi | Işığın Doğrusal İspatı |

---

### Deney 5.5: Tam Gölge Boyutunu Etkileyen Değişkenler Laboratuvarı
- **İlgili Sınıf & Ünite:** 5. Sınıf / 4. Ünite (Işığın Dünyası)
- **Maarif Modeli Kazanımı:** `FB.5.4.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 32–43 (Etkinlik Noktası: Gölgeyi Büyütüp Küçültelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Işık kaynağı ile opak cisim arasındaki mesafe ($d_1$) veya cisim ile perde arasındaki mesafe ($d_2$).
  * **Bağımlı Değişken:** Perdede oluşan tam gölgenin çapı ve alanı ($A$, $\text{cm}^2$).
  * **Sabit Tutulan Değişkenler:** Işık kaynağının türü (noktasal), opak cismin yarıçapı ($r=5\text{ cm}$).
- **İnteraktivite ve Fizik Motoru:**
  * Optik ray üzerinde fener, opak küre ve perde serbestçe sağa-sola sürüklenebilir.
  * Ray geometrisi: $R_{gölge} = r_{cisim} \cdot \frac{d_1 + d_2}{d_1}$ bağıntısıyla perdedeki gölgenin çapı gerçek zamanlı değişir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Işık-Cisim Mesafesi ($d_1$) | Cisim-Perde Mesafesi ($d_2$) | Gölge Çapı ($2R$) | Gölge Durumu |
| :---: | :---: | :---: | :---: |
| $20\text{ cm}$ (Yakın) | $40\text{ cm}$ | $30\text{ cm}$ | En Büyük Gölge |
| $40\text{ cm}$ (Uzak) | $40\text{ cm}$ | $20\text{ cm}$ | Orta Gölge |
| $40\text{ cm}$ | $20\text{ cm}$ (Perdeye Yakın) | $15\text{ cm}$ | Küçük Gölge |

---

### Deney 5.6: Sıvılarda Isı Alışverişi ve Denge Sıcaklığı
- **İlgili Sınıf & Ünite:** 5. Sınıf / 5. Ünite (Maddenin Doğası)
- **Maarif Modeli Kazanımı:** `FB.5.5.2`, `FB.5.5.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 62–73 (Etkinlik Noktası: Sıcaklıklar Eşitlenene Kadar)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Karıştırılan suların başlangıç sıcaklıkları ($T_1=20^\circ\text{C}, T_2=80^\circ\text{C}$) ve hacimleri/kütleleri ($m_1, m_2$).
  * **Bağımlı Değişken:** Isı alışverişi sonundaki denge sıcaklığı ($T_{denge}$) ve ısı akış yönü.
  * **Sabit Tutulan Değişkenler:** Sıvı cinsi (saf su), yalıtılmış kalorimetre kabı, ortam basıncı.
- **İnteraktivite ve Fizik Motoru:**
  * 2 beherdeki sular sürüklenip büyük kaba dökülür; sıcaklığı yüksek olandan düşük olana doğru animasyonlu ısı akış okları belirir.
  * $T_{denge} = \frac{m_1 T_1 + m_2 T_2}{m_1 + m_2}$ formülüyle termometre cıvası hareket eder, zaman-sıcaklık grafiğinde iki eğrinin denge çizgisine oturduğu gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| 1. Kap ($m_1, T_1$) | 2. Kap ($m_2, T_2$) | Isı Akış Yönü | Ölçülen Denge Sıcaklığı ($T_{denge}$) |
| :---: | :---: | :---: | :---: |
| $100\text{ mL}, 20^\circ\text{C}$ | $100\text{ mL}, 80^\circ\text{C}$ | 2. Kaptan 1. Kaba | $50^\circ\text{C}$ (Eşit Kütle) |
| $200\text{ mL}, 20^\circ\text{C}$ | $100\text{ mL}, 80^\circ\text{C}$ | 2. Kaptan 1. Kaba | $40^\circ\text{C}$ (Soğuğa Yakın) |
| $100\text{ mL}, 20^\circ\text{C}$ | $200\text{ mL}, 80^\circ\text{C}$ | 2. Kaptan 1. Kaba | $60^\circ\text{C}$ (Sıcağa Yakın) |

---

### Deney 5.7: Saf Suyun Isınma, Erime ve Kaynama Hâl Değişimi Grafiği
- **İlgili Sınıf & Ünite:** 5. Sınıf / 5. Ünite (Maddenin Doğası)
- **Maarif Modeli Kazanımı:** `FB.5.5.4`
- **Ders Kitabı Referansı:** 2. Kitap, s. 76–89 (Etkinlik Noktası: Sıcaklık Neden Sabit Kaldı?)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Geçen ısıtma süresi ($t$, dakika) ve ısıtıcı şiddeti (1 alev / 2 alev).
  * **Bağımlı Değişken:** Beherdeki suyun/buzun anlık sıcaklığı ($T$, $^\circ\text{C}$) ve fiziksel hâli (Katı, Sıvı, Gaz).
  * **Sabit Tutulan Değişkenler:** Saf su ($100\text{ g}$ buz ile başlama), $1\text{ atm}$ açık hava basıncı.
- **İnteraktivite ve Fizik Motoru:**
  * İspirto ocağı yakılır; buz parçaları erir, sıvılaşır ve kaynar.
  * Termometre sıcaklığı ölçerken ekranda anlık olarak Sıcaklık-Zaman grafiği çizilir. $0^\circ\text{C}$ (erime) ve $100^\circ\text{C}$ (kaynama) seviyelerinde sıcaklığın hâl değişimi süresince sabit kaldığı plato çizgileri belirginleşir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Zaman ($t$) | Sıcaklık ($T$) | Fiziksel Hâl | Açıklama |
| :---: | :---: | :---: | :---: |
| $0\text{ dk}$ | $-10^\circ\text{C}$ | Katı (Buz) | Sıcaklık artıyor |
| $2\text{ dk}$ | $0^\circ\text{C}$ | Katı + Sıvı | Erime Noktası (Sıcaklık Sabit) |
| $6\text{ dk}$ | $45^\circ\text{C}$ | Sıvı (Su) | Sıcaklık artıyor |
| $12\text{ dk}$ | $100^\circ\text{C}$ | Sıvı + Gaz | Kaynama Noktası (Sıcaklık Sabit) |

---

### Deney 5.8: Basit Elektrik Devresinde Ampul Parlaklığı Değişken Laboratuvarı
- **İlgili Sınıf & Ünite:** 5. Sınıf / 6. Ünite (Yaşamımızda Elektrik)
- **Maarif Modeli Kazanımı:** `FB.5.6.2`, `FB.5.6.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 112–127 (Etkinlik Noktası: Parlaklığı Değiştiren Faktörler)
- **Bilimsel Değişkenler:**
  * **1. Aşama (Pil Sayısı Deneyi):**
    - *Bağımsız Değişken:* Pil sayısı (1 pil, 2 pil, 3 pil).
    - *Bağımlı Değişken:* Ampul parlaklığı (Lümen / Işık halesi çapı).
    - *Sabit Tutulan Değişkenler:* Ampul sayısı (1 adet), iletken kablo boyu, anahtar.
  * **2. Aşama (Ampul Sayısı Deneyi):**
    - *Bağımsız Değişken:* Ampul sayısı (1 ampul, 2 ampul, 3 ampul).
    - *Bağımlı Değişken:* Ampul parlaklığı.
    - *Sabit Tutulan Değişkenler:* Pil sayısı (2 adet), iletken kablo boyu.
- **İnteraktivite ve Fizik Motoru:**
  * Devre tahtası üzerinde piller ve ampuller artı-eksi kutuplarına göre sürüklenerek bağlanır; anahtar tıklandığında devre kapanır ve akım elektron parçacıklarıyla görselleşir.
  * Parlaklık sensörü ve lüks değeri ekranda anlık değişir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Düzenek | Pil Sayısı | Ampul Sayısı | Parlaklık Derecesi | Bilimsel Sonuç |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 1 | 1 | Normal Parlak | Temel referans |
| 2 | 2 | 1 | Çok Parlak | Pil sayısı arttıkça parlaklık artar |
| 3 | 3 | 1 | Aşırı Parlak | Pil sayısı bağımsız değişken |
| 4 | 2 | 2 | Az Parlak | Ampul sayısı arttıkça parlaklık azalır |
| 5 | 2 | 3 | Çok Loş | Ampul sayısı bağımsız değişken |

---

## 2. 6. Sınıf İnteraktif Deney Havuzu

### Deney 6.1: Güneş ve Ay Tutulması Gölge Geometrisi
- **İlgili Sınıf & Ünite:** 6. Sınıf / 1. Ünite (Güneş Sistemi ve Tutulmalar)
- **Maarif Modeli Kazanımı:** `FB.6.1.3`, `FB.6.1.4`
- **Ders Kitabı Referansı:** 1. Kitap, s. 26–39 (Etkinlik Noktası: Tutulma Modeli Oluşturalım)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Güneş, Dünya ve Ay'ın sıralanış dizilimi (Güneş-Ay-Dünya vs. Güneş-Dünya-Ay) ve yörünge eğikliği ($5^\circ$ açı kontrolü).
  * **Bağımlı Değişken:** Tutulma türü (Güneş Tutulması / Ay Tutulması / Tutulma Gerçekleşmeme) ve Dünya üzerindeki tam/parçalı gölge alanı.
  * **Sabit Tutulan Değişkenler:** Güneş'in çapı, ışığın doğrusal yayılması.
- **İnteraktivite ve Fizik Motoru:**
  * 3 boyutlu derinlik hissi veren Canvas alanı; Ay yörüngesinde sürüklenir.
  * Ay, Güneş ile Dünya arasına girdiğinde Ay'ın gölge konisi Dünya'nın belirli bir bölgesine düşer (Güneş Tutulması). Dünya Ay ile Güneş arasına girdiğinde Ay Dünya'nın devasa gölgesine girip kararır (Ay Tutulması).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Sıralanış | Ay'ın Evresi | Gölge Nereye Düşer? | Olayın Adı | Gündüz/Gece |
| :---: | :---: | :---: | :---: | :---: |
| Güneş — Ay — Dünya | Yeni Ay | Dünya'nın bir bölgesine | Güneş Tutulması | Gündüz kuşağında |
| Güneş — Dünya — Ay | Dolunay | Ay'ın tamamına | Ay Tutulması | Gece kuşağında |

---

### Deney 6.2: Aynı Doğrultulu Kuvvetlerin Bileşkesi ($R$) ve Denge Simülatörü
- **İlgili Sınıf & Ünite:** 6. Sınıf / 2. Ünite (Kuvvetin Etkisinde Hareket)
- **Maarif Modeli Kazanımı:** `FB.6.2.1`, `FB.6.2.2`
- **Ders Kitabı Referansı:** 1. Kitap, s. 46–59 (Etkinlik Noktası: Kuvvetleri Birleştirelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Doğu ve Batı yönünde cisme uygulanan kuvvetlerin sayısı ve büyüklükleri ($F_1, F_2, F_3, F_4$).
  * **Bağımlı Değişken:** Net bileşke kuvvet ($R$, N), bileşkenin yönü ve cismin hareket durumu (Durgun, Doğuya ivmelenen, Batıya ivmelenen).
  * **Sabit Tutulan Değişkenler:** Cisim kütlesi ($5\text{ kg}$), sürtünmesiz yatay düzlem.
- **İnteraktivite ve Fizik Motoru:**
  * Halat çekme arabası; sağ ve sol tarafa farklı güçlerde sporcu figürleri sürüklenip bırakılır.
  * Vektör okları dinamik olarak toplanır ($R = \Sigma F_{Doğu} - \Sigma F_{Batı}$). $R=0$ ise araba sabit kalır ("Dengelenmiş Kuvvetler"). $R \ne 0$ ise araba net kuvvet yönünde ivmelenir ("Dengelenmemiş Kuvvetler").
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Doğu Kuvvetleri ($\Sigma F_D$) | Batı Kuvvetleri ($\Sigma F_B$) | Bileşke Kuvvet ($R$) | Yön | Hareket Durumu |
| :---: | :---: | :---: | :---: | :---: |
| $15\text{ N}$ | $15\text{ N}$ | $0\text{ N}$ | Yok | Dengelenmiş (Hareketsiz) |
| $25\text{ N}$ | $10\text{ N}$ | $15\text{ N}$ | Doğu | Dengelenmemiş (Doğuya Hızlanan) |
| $5\text{ N}$ | $20\text{ N}$ | $15\text{ N}$ | Batı | Dengelenmemiş (Batıya Hızlanan) |

---

### Deney 6.3: Sabit Süratli Hareket, Yol-Zaman ve Sürat-Zaman Grafikleri
- **İlgili Sınıf & Ünite:** 6. Sınıf / 2. Ünite (Kuvvetin Etkisinde Hareket)
- **Maarif Modeli Kazanımı:** `FB.6.2.3`
- **Ders Kitabı Referansı:** 1. Kitap, s. 62–75 (Etkinlik Noktası: Sürati Hesaplayalım, Grafiği Çizelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Geçen zaman ($t = 1, 2, 3, 4, 5\text{ s}$) ve seçilen araç sürati ($v = 5\text{ m/s}, 10\text{ m/s}, 20\text{ m/s}$).
  * **Bağımlı Değişken:** Aracın pist üzerinde aldığı toplam yol ($x$, metre).
  * **Sabit Tutulan Değişkenler:** Süratin sabit tutulması ($v = \text{sabit}$), doğrusal yörünge.
- **İnteraktivite ve Fizik Motoru:**
  * Yarış pistinde hareket eden araç; öğrenci "Başlat" butonuna bastığında araç sabit süratle ilerler ve her saniye yol tabelasını kaydeder.
  * Eşzamanlı iki grafik render edilir:
    1. *Yol-Zaman Grafiği ($x-t$):* Düzgün yükselen doğrusal çizgi (eğim sürati verir).
    2. *Sürat-Zaman Grafiği ($v-t$):* Yatay sabit çizgi (alttaki alan yolu verir).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Zaman ($t$, s) | Alınan Yol ($x$, m) | Hesaplanan Sürat ($v = x/t$) | Sürat Durumu |
| :---: | :---: | :---: | :---: |
| $1\text{ s}$ | $10\text{ m}$ | $10\text{ m/s}$ | Sabit Sürat |
| $2\text{ s}$ | $20\text{ m}$ | $10\text{ m/s}$ | Sabit Sürat |
| $3\text{ s}$ | $30\text{ m}$ | $10\text{ m/s}$ | Sabit Sürat |
| $4\text{ s}$ | $40\text{ m}$ | $10\text{ m/s}$ | Sabit Sürat |

---

### Deney 6.4: Düzlem Aynada Yansıma Kanunları ($i = r$)
- **İlgili Sınıf & Ünite:** 6. Sınıf / 4. Ünite (Işığın Yansıması ve Renkler)
- **Maarif Modeli Kazanımı:** `FB.6.4.1`, `FB.6.4.2`
- **Ders Kitabı Referansı:** 1. Kitap, s. 138–151 (Etkinlik Noktası: Gelme Açısı Eşittir Yansıma Açısı)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Gelen ışının ayna yüzey normali ile yaptığı gelme açısı ($i = 0^\circ - 80^\circ$ döner kadran).
  * **Bağımlı Değişken:** Yansıyan ışının yüzey normali ile yaptığı yansıma açısı ($r$) ve ayna yüzeyiyle yaptığı açı.
  * **Sabit Tutulan Değişkenler:** Düzlem ayna pürüzsüzlüğü, yüzey normali ($90^\circ$).
- **İnteraktivite ve Fizik Motoru:**
  * Açıölçer (iletki) zemininde lazer feneri fare veya dokunmatik parmakla döndürülür.
  * Optik yansıma kanunları ($i = r$, gelen ışın-normal-yansıyan ışın aynı düzlemdedir) gerçek zamanlı ışın takibiyle çizilir. Yüzeye dik gelen ($i=0^\circ$) ışının kendi üzerinden geri yansıdığı net gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Deneme No | Gelme Açısı ($i$) | Yansıma Açısı ($r$) | Aynayla Yapılan Açı ($90-i$) | Kural Doğrulandı mı? |
| :---: | :---: | :---: | :---: | :---: |
| 1 | $20^\circ$ | $20^\circ$ | $70^\circ$ | Evet ($i = r$) |
| 2 | $45^\circ$ | $45^\circ$ | $45^\circ$ | Evet ($i = r$) |
| 3 | $60^\circ$ | $60^\circ$ | $30^\circ$ | Evet ($i = r$) |
| 4 | $0^\circ$ (Dik Gelen) | $0^\circ$ | $90^\circ$ | Evet (Kendi Üzerinden Döner) |

---

### Deney 6.5: Işığın Soğurulması ve Cisimlerin Renkli Görünmesi
- **İlgili Sınıf & Ünite:** 6. Sınıf / 4. Ünite (Işığın Yansıması ve Renkler)
- **Maarif Modeli Kazanımı:** `FB.6.4.4`, `FB.6.4.5`, `FB.6.4.6`
- **Ders Kitabı Referansı:** 1. Kitap, s. 162–177 (Etkinlik Noktası: Cisimler Neden Renkli Görünür?)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Gönderilen ışık rengi (Beyaz, Kırmızı, Yeşil, Mavi filtre) ve cisim pigment rengi (Kırmızı tişört, Yeşil elma, Mavi şapka, Beyaz kağıt, Siyah kömür).
  * **Bağımlı Değişken:** Cismin göze yansıttığı ışık rengi ve algılanan görünüm rengi.
  * **Sabit Tutulan Değişkenler:** Karanlık oda ortamı, gözlemci mesafesi.
- **İnteraktivite ve Fizik Motoru:**
  * Karanlık laboratuvar sahnesi; kullanıcı renkli spot ışığı seçer ve farklı renkli cisimlerin üzerine tutar.
  * Işığın soğurulma ve yansıma modeli: Bir cisim kendi rengindeki ışığı yansıtır, diğer renkleri soğurur; üzerine kendi rengi düşmezse ışık yansıtamaz ve siyah görünür.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Cisim Rengi | Gönderilen Işık Rengi | Yansıyan Işık | Gözlenen Cisim Rengi | Açıklama |
| :---: | :---: | :---: | :---: | :---: |
| Kırmızı Tişört | Beyaz Işık | Kırmızı | Kırmızı | Kırmızı hariç renkleri soğurur |
| Kırmızı Tişört | Yeşil Işık | Yansıyan yok | Siyah | Yeşili tamamen soğurur |
| Mavi Şapka | Mavi Işık | Mavi | Mavi | Kendi rengini yansıtır |
| Beyaz Kağıt | Mavi Işık | Mavi | Mavi | Beyaz tüm renkleri yansıtır |

---

### Deney 6.6: Maddelerin Yoğunluğu ($d = m / V$) ve Ölçüm İstasyonu
- **İlgili Sınıf & Ünite:** 6. Sınıf / 5. Ünite (Maddenin Ayırt Edici Özellikleri)
- **Maarif Modeli Kazanımı:** `FB.6.5.3`, `FB.6.5.4`
- **Ders Kitabı Referansı:** 2. Kitap, s. 28–41 (Etkinlik Noktası: Kütleyi Hacme Bölelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Seçilen katı cisim türü (Demir küp, Alüminyum silindir, Tahta blok, Taş parçası) veya kütlesi ($50\text{ g}, 100\text{ g}, 200\text{ g}$).
  * **Bağımlı Değişken:** Dereceli silindirde taşan/yükselen sıvı hacmi ($V$, $\text{cm}^3$) ve hesaplanan yoğunluk değeri ($d = m/V$).
  * **Sabit Tutulan Değişkenler:** Sıvı cinsi (saf su, $d=1\text{ g/cm}^3$), sıcaklık ($20^\circ\text{C}$).
- **İnteraktivite ve Fizik Motoru:**
  * Ekranda dijital terazi ve içi su dolu dereceli silindir ($V_{ilk} = 100\text{ mL}$).
  * Cisim önce teraziye sürüklenip tartılır ($m$), ardından silindire atılır; su seviyesi yükselir ($V_{son}$). Hacim $\Delta V = V_{son} - V_{ilk}$ olarak hesaplanır ve $d = m/V$ formülüyle yoğunluk bulunur.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Cisim Adı | Kütle ($m$) | İlk Hacim ($V_1$) | Son Hacim ($V_2$) | Cisim Hacmi ($V$) | Yoğunluk ($d=m/V$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Demir Küp | $156\text{ g}$ | $100\text{ mL}$ | $120\text{ mL}$ | $20\text{ cm}^3$ | $7.8\text{ g/cm}^3$ |
| Alüminyum | $54\text{ g}$ | $100\text{ mL}$ | $120\text{ mL}$ | $20\text{ cm}^3$ | $2.7\text{ g/cm}^3$ |
| Tahta Blok | $30\text{ g}$ | $100\text{ mL}$ | $150\text{ mL}$ | $50\text{ cm}^3$ | $0.6\text{ g/cm}^3$ |

---

### Deney 6.7: Sıvı Yoğunluk Kulesi ve Yüzme-Batma Simülatörü
- **İlgili Sınıf & Ünite:** 6. Sınıf / 5. Ünite (Maddenin Ayırt Edici Özellikleri)
- **Maarif Modeli Kazanımı:** `FB.6.5.4`, `FB.6.5.5`
- **Ders Kitabı Referansı:** 2. Kitap, s. 44–55 (Etkinlik Noktası: Birbirine Karışmayan Sıvılar)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Dereceli silindire dökülen sıvıların ve içine atılan katı cisimlerin yoğunlukları ($d$).
  * **Bağımlı Değişken:** Sıvıların silindirdeki tabaka sırası (en yoğun altta, en az yoğun üstte) ve katı cisimlerin denge konumu (yüzme, askıda kalma, batma).
  * **Sabit Tutulan Değişkenler:** Sıvıların birbirine karışmaması, yer çekimi ivmesi.
- **İnteraktivite ve Fizik Motoru:**
  * Bal ($1.4\text{ g/cm}^3$), Su ($1.0\text{ g/cm}^3$), Zeytinyağı ($0.9\text{ g/cm}^3$) ve İspirto ($0.8\text{ g/cm}^3$) tüpe dökülür; yoğunluklarına göre ayrışırlar.
  * İçine demir bilye ($7.8$), üzüm tanesi ($1.1$), mum ($0.95$) ve mantar tıpa ($0.2$) bırakıldığında, her cisim kendi yoğunluğuna eşit sıvı katmanında askıda kalır veya dibe batar.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Madde / Sıvı | Yoğunluk ($d$) | Silindirdeki Konumu | Yüzme / Batma Durumu |
| :---: | :---: | :---: | :---: |
| Bal | $1.4\text{ g/cm}^3$ | En Dip Katman | En büyük yoğunluk |
| Su | $1.0\text{ g/cm}^3$ | 2. Katman | Balın üstünde, yağın altında |
| Zeytinyağı | $0.9\text{ g/cm}^3$ | 3. Katman | Suyun üstünde yüzer |
| Mantar Tıpa | $0.2\text{ g/cm}^3$ | En Üst Yüzey | Tüm sıvılardan hafif (Yüzer) |
| Demir Bilye | $7.8\text{ g/cm}^3$ | En Dip Taban | Tüm sıvılardan yoğun (Batar) |

---

### Deney 6.8: İletken ve Yalıtkan Maddelerin Devre Test İstasyonu
- **İlgili Sınıf & Ünite:** 6. Sınıf / 6. Ünite (Elektriğin İletimi ve Direnç)
- **Maarif Modeli Kazanımı:** `FB.6.6.1`
- **Ders Kitabı Referansı:** 2. Kitap, s. 68–79 (Etkinlik Noktası: Elektriği İletenler ve İletmeyenler)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Açık test uçları arasına bağlanan malzeme (Bakır tel, Demir çivi, Tuzlu su, Şekerli su, Plastik cetvel, Tahta kalem, Kurşun kalem ucu / grafit, Saf su).
  * **Bağımlı Değişken:** Devrenin kapanıp akım geçmesi, ampulün ışık vermesi (İletken / Yalıtkan durumu).
  * **Sabit Tutulan Değişkenler:** Pil gerilimi ($3\text{ V}$), ampul özellikleri, bağlantı kabloları.
- **İnteraktivite ve Fizik Motoru:**
  * İki serbest timsah ağızlı test ucu; kullanıcı tezgahtaki nesneleri bu uçlara sürükler.
  * İletken nesne bağlandığında devre tamamlanır, ampul sarı ışık saçar; yalıtkan bağlandığında ampul sönük kalır. Sıvı kaplarına daldırılan elektrotlar ile tuzlu suyun iletken, şekerli suyun yalıtkan olduğu gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Test Edilen Madde | Fiziksel Hâl | Ampul Işık Verdi mi? | İletken / Yalıtkan |
| :---: | :---: | :---: | :---: |
| Bakır Tel | Katı | Evet (Parlak) | Katı İletken |
| Demir Çivi | Katı | Evet (Parlak) | Katı İletken |
| Kurşun Kalem Ucu (Grafit) | Katı | Evet (Orta) | Katı İletken (Ametal) |
| Plastik Silgi | Katı | Hayır | Katı Yalıtkan |
| Tuzlu Su Çözeltisi | Sıvı | Evet (Parlak) | Sıvı İletken |
| Şekerli Su Çözeltisi | Sıvı | Hayır | Sıvı Yalıtkan |

---

### Deney 6.9: İletkenin Direncine Etki Eden Değişkenler ve Reosta
- **İlgili Sınıf & Ünite:** 6. Sınıf / 6. Ünite (Elektriğin İletimi ve Direnç)
- **Maarif Modeli Kazanımı:** `FB.6.6.2`, `FB.6.6.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 80–93 (Etkinlik Noktası: Telin Boyu, Kesiti ve Direnç)
- **Bilimsel Değişkenler:**
  * **1. Deney (Boy Değişkeni):** Bağımsız: İletken telin uzunluğu ($L = 10\text{ cm}, 20\text{ cm}, 40\text{ cm}$); Bağımlı: Direnç ($R$) ve ampul parlaklığı; Sabit: Kesit alanı ($S$), tel cinsi (Bakır).
  * **2. Deney (Kesit Değişkeni):** Bağımsız: İletken telin kesit alanı ($S$ ince tel vs. $3S$ kalın tel); Bağımlı: Direnç ($R$) ve parlaklık; Sabit: Uzunluk ($L$), tel cinsi.
  * **3. Deney (Reosta Sürgüsü):** Bağımsız: Reosta sürgüsünün sağa-sola kaydırılması; Bağımlı: Devredeki direnç ve ampul parlaklığı.
- **İnteraktivite ve Fizik Motoru:**
  * Direnç formülü görselleştirilir: $R = \rho \cdot \frac{L}{S}$.
  * Reosta sürgüsü kaydırıldıkça devreden geçen akım $I = V / R$ oranında anlık hesaplanır; ampulün parlaklığı kademeli olarak artar veya kısılır (dimmer anahtar prensibi).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Tel Özelliği | Uzunluk ($L$) | Kesit Alanı ($S$) | Devre Direnci ($R$) | Ampul Parlaklığı |
| :---: | :---: | :---: | :---: | :---: |
| Kısa & Kalın Bakır Tel | $10\text{ cm}$ | $2\text{ mm}^2$ | En Küçük Direnç | En Parlak |
| Uzun & Kalın Bakır Tel | $30\text{ cm}$ | $2\text{ mm}^2$ | Orta Direnç | Orta Parlak |
| Uzun & İnce Bakır Tel | $30\text{ cm}$ | $0.5\text{ mm}^2$ | En Büyük Direnç | En Loş |
| Reosta Sürgüsü Sağa (Tel Uzadı) | Artıyor | Sabit | Direnç Artar | Parlaklık Azalır |

---

## 3. 7. Sınıf İnteraktif Deney Havuzu

### Deney 7.1: Fiziksel Anlamda İş ($W = F \cdot \Delta x$) ve Kuvvet-Doğrultu Analizi
- **İlgili Sınıf & Ünite:** 7. Sınıf / 2. Ünite (Kuvvet ve Enerjiyi Keşfedelim)
- **Maarif Modeli Kazanımı:** `FB.7.2.1`
- **Ders Kitabı Referansı:** 1. Kitap, s. 58–69 (Etkinlik Noktası: Fen Anlamında İş Ne Zaman Yapılır?)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Uygulanan kuvvetin büyüklüğü ($F$, N), yönü (Yatay, Düşey) ve cismin hareket doğrultusu ($\Delta x$, m).
  * **Bağımlı Değişken:** Fiziksel anlamda iş yapılıp yapılmadığı ve yapılan işin büyüklüğü ($W = F \cdot \Delta x$, Joule).
  * **Sabit Tutulan Değişkenler:** Cisim kütlesi ($10\text{ kg}$).
- **İnteraktivite ve Fizik Motoru:**
  * 3 farklı etkileşimli karakter senaryosu:
    1. *Kutuyu yatayda iterek hareket ettirme:* Kuvvet yatay, hareket yatay $\rightarrow$ **İş Yapılır ($W > 0$)**.
    2. *Sırt çantasını omzunda tutup yatayda yürüme:* Kuvvet düşey, hareket yatay (dik açı) $\rightarrow$ **İş Yapılmaz ($W = 0$)**.
    3. *Sabit duvara kuvvet uygulama:* Kuvvet var, yer değiştirme sıfır ($\Delta x = 0$) $\rightarrow$ **İş Yapılmaz ($W = 0$)**.
  * Canlı vektör okları ve Joule enerji göstergesi.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Durum No | Senaryo | Kuvvet Yönü | Hareket Yönü | Yer Değiştirme | Fiziksel İş ($W$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Kutuyu Yatay İtme | Yatay ($\rightarrow$) | Yatay ($\rightarrow$) | $5\text{ m}$ | $W = 100\text{ N} \cdot 5\text{ m} = 500\text{ J}$ (İş Var) |
| 2 | Çantayla Düz Yürüme | Düşey ($\uparrow$) | Yatay ($\rightarrow$) | $10\text{ m}$ | $W = 0\text{ J}$ (Kuvvet Harekete Dik!) |
| 3 | Duvara Yüklenme | Yatay ($\rightarrow$) | Hareketsiz | $0\text{ m}$ | $W = 0\text{ J}$ (Yer Değiştirme Yok!) |

---

### Deney 7.2: Mekanik Enerji Dönüşümü ve Korunumu (Sarkaç & Kaykay Pisti)
- **İlgili Sınıf & Ünite:** 7. Sınıf / 2. Ünite (Kuvvet ve Enerjiyi Keşfedelim)
- **Maarif Modeli Kazanımı:** `FB.7.2.2`, `FB.7.2.3`
- **Ders Kitabı Referansı:** 1. Kitap, s. 70–85 (Etkinlik Noktası: Enerji Kaybolur mu, Dönüşür mü?)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Sarkacın çekilip bırakıldığı yükseklik ($h$, m) veya açı ($\theta$) / Sürtünme anahtarı (Açık/Kapalı).
  * **Bağımlı Değişken:** Anlık çekim potansiyel enerjisi ($E_p$), kinetik enerji ($E_k$), toplam mekanik enerji ($E_{toplam}$) ve anlık sürat ($v$).
  * **Sabit Tutulan Değişkenler:** Sarkaç topunun kütlesi ($m$), ip uzunluğu ($L$), yer çekimi ivmesi ($g$).
- **İnteraktivite ve Fizik Motoru:**
  * Sarkaç veya U biçimli kaykay pisti; kullanıcı topu fare/dokunmatik ile yukarı çekip bırakır.
  * Gerçek zamanlı dinamik sütun/pasta grafiği:
    * En üst noktada: $E_p = \text{Maksimum}$, $E_k = 0$.
    * En alt denge noktasında: $E_p = 0$, $E_k = \text{Maksimum}$ (sürat en yüksek).
    * Sürtünme açıldığında mekanik enerjinin ısı enerjisine dönüşerek salınımın yavaşça sönümlendiği gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Sarkaç Konumu | Yükseklik ($h$) | Sürat ($v$) | Potansiyel Enerji ($E_p$) | Kinetik Enerji ($E_k$) | Toplam Enerji ($E_{top}$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| En Tepe Nokta (A) | Maksimum | $0\text{ m/s}$ | $\%100$ | $\%0$ | Korunur ($E_p$) |
| Orta Nokta (Dengeye Giderken) | $h/2$ | Orta | $\%50$ | $\%50$ | Korunur ($E_p + E_k$) |
| En Alt Nokta (Denge-B) | Sıfır | Maksimum | $\%0$ | $\%100$ | Korunur ($E_k$) |

---

### Deney 7.3: Işığın Kırılması ve Sınır Açısı Simülatörü
- **İlgili Sınıf & Ünite:** 7. Sınıf / 4. Ünite (Işığın Kırılması ve Mercekler)
- **Maarif Modeli Kazanımı:** `FB.7.4.1`
- **Ders Kitabı Referansı:** 2. Kitap, s. 16–29 (Etkinlik Noktası: Işığın Ortam Değiştirmesi ve Kırılma)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** 1. ve 2. ortamların optik yoğunlukları (Hava: Az Yoğun, Su: Çok Yoğun, Cam: Çok Yoğun) ve gelme açısı ($0^\circ - 85^\circ$ döner lazer feneri).
  * **Bağımlı Değişken:** Kırılma açısı ($r$), ışığın ortamdaki yayılma sürati ve normale yaklaşma/uzaklaşma durumu.
  * **Sabit Tutulan Değişkenler:** Yüzey ayırıcı düzlem, yüzey normali ($N$).
- **İnteraktivite ve Fizik Motoru:**
  * Lazer feneri açıölçer üzerinde döndürülür; ortamlar açılır menüden seçilir.
  * Az yoğundan çok yoğuna: Normale yaklaşır, sürat azalır.
  * Çok yoğundan az yoğuna: Normalden uzaklaşır, sınır açısında yüzeyi yalar ($90^\circ$), sınır açısı aşıldığında tam yansıma yapar.
  * Işın yolu ve dalga cepheleri pürüzsüz Canvas çizgileriyle render edilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Işık Geçişi | Gelme Açısı ($i$) | Kırılma Açısı ($r$) | Hız Değişimi | Normale Göre Davranış |
| :---: | :---: | :---: | :---: | :---: |
| Hava $\rightarrow$ Su | $30^\circ$ | $\approx 22^\circ$ | Azalır | Normale Yaklaşır ($i > r$) |
| Hava $\rightarrow$ Cam | $45^\circ$ | $\approx 28^\circ$ | Çok Azalır | Normale Çok Yaklaşır ($i > r$) |
| Su $\rightarrow$ Hava | $30^\circ$ | $\approx 42^\circ$ | Artar | Normalden Uzaklaşır ($r > i$) |
| Su $\rightarrow$ Hava (Sınır Açısı) | $48.6^\circ$ | $90^\circ$ | Artar | Yüzeyi Yalar |
| Su $\rightarrow$ Hava (Aşırı Açı) | $60^\circ$ | Kırılma Yok | Sabit | Tam Yansıma Yapar |

---

### Deney 7.4: İnce ve Kalın Kenarlı Merceklerde Işığın Odaklanması
- **İlgili Sınıf & Ünite:** 7. Sınıf / 4. Ünite (Işığın Kırılması ve Mercekler)
- **Maarif Modeli Kazanımı:** `FB.7.4.2`, `FB.7.4.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 30–41 (Etkinlik Noktası: Işığı Toplayan ve Dağıtan Mercekler)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Mercek çeşidi (İnce kenarlı / Yakınsak Mercek vs. Kalın kenarlı / Iraksak Mercek) ve paralel ışın demeti sayısı (3 ışın, 5 ışın).
  * **Bağımlı Değişken:** Işınların kırıldıktan sonra bir noktada toplanması (Odak noktası, $F$) veya uzantılarının odaktan dağılması.
  * **Sabit Tutulan Değişkenler:** Optik eksen, ortam (hava).
- **İnteraktivite ve Fizik Motoru:**
  * Lazer rayından optik eksene paralel 5 adet renkli ışın gönderilir.
  * İnce kenarlı mercek konulduğunda ışınlar merceğin diğer tarafındaki odak noktasında ($F$) toplanır (büyüteç, mikroskop prensibi). Kalın kenarlı mercek konulduğunda ışınlar uzantıları odaktan geçecek şekilde etrafa dağılır (miyop gözlük camı prensibi).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Mercek Türü | Kenar ve Orta Kalınlığı | Paralel Işınların Davranışı | Odaklanma Şekli | Kullanım Alanı Örneği |
| :---: | :---: | :---: | :---: | :---: |
| İnce Kenarlı | Ortası kalın, kenarları ince | Işınları tek noktada toplar | Gerçek Odak ($F$) | Büyüteç, Dürbün, Hipermetrop |
| Kalın Kenarlı | Ortası ince, kenarları kalın | Işınları etrafa dağıtır | Uzantıların Odağı ($F$) | Miyop Gözlüğü, Kapı Dürbünü |

---

### Deney 7.5: Çözünme Hızına Etki Eden Faktörler Kontrollü Deney Laboratuvarı
- **İlgili Sınıf & Ünite:** 7. Sınıf / 5. Ünite (Maddenin Doğasına Yolculuk)
- **Maarif Modeli Kazanımı:** `FB.7.5.9`
- **Ders Kitabı Referansı:** 2. Kitap, s. 78–89 (Etkinlik Noktası: Çözünmeyi Hızlandıralım)
- **Bilimsel Değişkenler:**
  * **1. Deney (Sıcaklık Etkisi):**
    - *Bağımsız Değişken:* Su sıcaklığı ($20^\circ\text{C}$ soğuk su vs. $60^\circ\text{C}$ sıcak su).
    - *Bağımlı Değişken:* Şekerin tamamen çözünme süresi ($t$, saniye).
    - *Sabit Tutulan Değişkenler:* Su miktarı ($100\text{ mL}$), şeker miktarı ve türü (1 adet $5\text{ g}$ küp şeker), karıştırma durumu (karıştırılmıyor).
  * **2. Deney (Temas Yüzeyi Etkisi):**
    - *Bağımsız Değişken:* Şekerin tanecik boyutu (Küp şeker vs. Toz şeker vs. Pudra şekeri).
    - *Bağımlı Değişken:* Çözünme süresi.
    - *Sabit Tutulan Değişkenler:* Su sıcaklığı ($30^\circ\text{C}$), su miktarı ($100\text{ mL}$), şeker kütlesi ($5\text{ g}$).
  * **3. Deney (Karıştırma Etkisi):**
    - *Bağımsız Değişken:* Manyetik karıştırıcı / Kaşık ile karıştırma (Var / Yok).
    - *Bağımlı Değişken:* Çözünme süresi.
- **İnteraktivite ve Fizik Motoru:**
  * İki özdeş beher yan yana durur; öğrenci A ve B beherlerinin parametrelerini ayarlar ve "Şekerleri Bırak & Kronometreyi Başlat" butonuna basar.
  * Tanecikler çözünürken beher tabanındaki şeker yavaşça ufalanıp yok olur; kronometre anlık süreyi kaydeder ve karşılaştırma tablosuna işler.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Düzenek | Su Sıcaklığı | Şeker Türü | Karıştırma | Çözünme Süresi ($t$) | Sonuç Çıkarımı |
| :---: | :---: | :---: | :---: | :---: | :---: |
| A Beheri | $20^\circ\text{C}$ | Küp Şeker ($5\text{ g}$) | Yok | $65\text{ s}$ | Yavaş Çözünme |
| B Beheri | $60^\circ\text{C}$ | Küp Şeker ($5\text{ g}$) | Yok | $22\text{ s}$ | Sıcaklık arttıkça hız artar |
| C Beheri | $20^\circ\text{C}$ | Toz Şeker ($5\text{ g}$) | Yok | $34\text{ s}$ | Temas yüzeyi arttıkça hız artar |
| D Beheri | $20^\circ\text{C}$ | Toz Şeker ($5\text{ g}$) | Var | $12\text{ s}$ | Karıştırma çözünmeyi hızlandırır |

---

### Deney 7.6: Karışımların Ayrılması (Yoğunluk Farkı & Buharlaştırma)
- **İlgili Sınıf & Ünite:** 7. Sınıf / 5. Ünite (Maddenin Doğasına Yolculuk)
- **Maarif Modeli Kazanımı:** `FB.7.5.10`
- **Ders Kitabı Referansı:** 2. Kitap, s. 90–101 (Etkinlik Noktası: Maddeleri Ayrıştıralım)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Seçilen ayırma yöntemi ve karışım türü (Zeytinyağı-Su heterojen $\rightarrow$ Ayırma Hunisi; Tuz-Su homojen $\rightarrow$ Buharlaştırma; Demir tozu-Kükürt $\rightarrow$ Mıknatıs).
  * **Bağımlı Değişken:** Bileşenlerin saflıkla geri kazanılması.
  * **Sabit Tutulan Değişkenler:** Karışım hacmi / kütlesi.
- **İnteraktivite ve Fizik Motoru:**
  * Ayırma hunisinde musluk tıklanarak açılır; yoğunluğu büyük olan alttaki su beherde toplanır, iki sıvının ayrım çizgisi musluğa geldiğinde musluk kapatılır (yoğunluk farkıyla ayırma).
  * Tuzlu su kabı ispirto ocağıyla ısıtılır; su buharlaşır ve kap tabanında beyaz tuz kristalleri çökelir (buharlaştırma yöntemi).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Karışım Türü | Bileşenler | Ayrışma İlkesi | Kullanılan Düzenek / Yöntem | Elde Edilen Çıktı |
| :---: | :---: | :---: | :---: | :---: |
| Heterojen Sıvı-Sıvı | Zeytinyağı + Su | Yoğunluk Farkı | Ayırma Hunisi | Önce su, sonra yağ ayrıldı |
| Homojen Sıvı-Katı | Tuz + Su | Kaynama Noktası Farkı | Buharlaştırma / İspirto Ocağı | Su buharlaştı, tuz dipte kaldı |
| Heterojen Katı-Katı | Demir Tozu + Kükürt | Manyetik Özellik | Mıknatıs | Demir çekildi, kükürt kaldı |

---

### Deney 7.7: Sürtünme ve Dokunma ile Elektriklenme Simülatörü
- **İlgili Sınıf & Ünite:** 7. Sınıf / 6. Ünite (Elektriklenme)
- **Maarif Modeli Kazanımı:** `FB.7.6.1`, `FB.7.6.2`
- **Ders Kitabı Referansı:** 2. Kitap, s. 106–119 (Etkinlik Noktası: Yüklerin Hareketi ve Elektriklenme)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Sürtünen malzeme çifti (Ebonit çubuk + Yün kumaş vs. Cam çubuk + İpek kumaş) ve sürtünme sayısı.
  * **Bağımlı Değişken:** Cisimlerde biriken net elektrik yükünün cinsi ($+$ veya $-$) ve aktarılan negatif elektron miktarı.
  * **Sabit Tutulan Değişkenler:** Pozitif protonların çekirdekte sabit kalması kuralı, toplam yükün korunumu.
- **İnteraktivite ve Fizik Motoru:**
  * Çubuk kumaş üzerine fare/parmakla sürtülür.
  * Ebonit çubukta: Yün kumaştan çubuğa mavi eksi yükler ($-$) akar; ebonit çubuk negatif ($-$), yün kumaş pozitif ($+$) yüklenir.
  * Cam çubukta: Cam çubuktan ipek kumaşa eksi yükler akar; cam çubuk pozitif ($+$), ipek kumaş negatif ($-$) yüklenir.
  * Ardından yüklü çubuk nötr iletken küreye dokundurularak dokunma ile yük paylaşımı gösterilir.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Cisim Çifti | Sürtünme Öncesi Yük | Elektron Transfer Yönü | Sürtünme Sonrası Çubuk | Sürtünme Sonrası Kumaş |
| :---: | :---: | :---: | :---: | :---: |
| Ebonit Çubuk + Yün Kumaş | Nötr ($+ = -$) | Yün kumaştan $\rightarrow$ Çubuğa | Negatif ($-$) Yüklü | Pozitif ($+$) Yüklü |
| Cam Çubuk + İpek Kumaş | Nötr ($+ = -$) | Çubuktan $\rightarrow$ İpek kumaşa | Pozitif ($+$) Yüklü | Negatif ($-$) Yüklü |

---

### Deney 7.8: Elektroskop Yük Tayini ve Yaprak Açılma/Kapanma Simülatörü
- **İlgili Sınıf & Ünite:** 7. Sınıf / 6. Ünite (Elektriklenme)
- **Maarif Modeli Kazanımı:** `FB.7.6.2`, `FB.7.6.3`
- **Ders Kitabı Referansı:** 2. Kitap, s. 120–129 (Etkinlik Noktası: Elektroskopla Yükleri Keşfedelim)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Elektroskoba yaklaştırılan veya dokundurulan cismin yük cinsi ($+$, $-$, nötr), yük miktarı ve işlem türü (Etki ile yaklaştırma vs. Dokundurma vs. Topraklama).
  * **Bağımlı Değişken:** Elektroskop yapraklarının hareket açısı (Açılma, Kapanma, Biraz kapanıp tekrar açılma).
  * **Sabit Tutulan Değişkenler:** Elektroskobun fiziksel yapısı (iletken topuz, metal gövde, altın/alüminyum yapraklar, cam fanus).
- **İnteraktivite ve Fizik Motoru:**
  * Etkileşimli elektroskop; kullanıcı yüklü bir çubuğu topuza yaklaştırır veya dokundurur.
  * Nötr elektroskoba yüklü cisim yaklaştırılınca: Topuz zıt yükle kutuplanır, yapraklar aynı yükle yüklenip elektrostatik itmeyle açılır ($\theta > 0$).
  * Topraklama butonuna tıklandığında: Topraktan elektron gelerek/toprağa elektron akarak elektroskop anında nötrleşir ve yapraklar tamamen kapanır.
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Elektroskop Başlangıç Yükü | Yaklaştırılan / Dokundurulan Cisim | İşlem Türü | Yaprakların Davranışı | Sonuç |
| :---: | :---: | :---: | :---: | :---: |
| Nötr Elektroskop | Negatif ($-$) Çubuk | Yaklaştırma (Etki) | Yapraklar açılır | Topuz ($+$), Yapraklar ($-$) |
| Pozitif ($+$) Elektroskop | Pozitif ($+$) Cisim | Dokundurma | Yapraklar daha çok açılır | Aynı cins yük arttı |
| Pozitif ($+$) Elektroskop | Çok Negatif ($--$) Cisim | Dokundurma | Önce kapanır, sonra tekrar açılır | Yük işareti tersine döndü |
| Yüklü Elektroskop | Topraklama Teli | Topraklama | Yapraklar tamamen kapanır | Cisim nötrleşti |

---

### Deney 7.9: Besin Piramidinde Enerji Akışı ve Biyolojik Birikim Simülatörü
- **İlgili Sınıf & Ünite:** 7. Sınıf / 7. Ünite (Sürdürülebilir Yaşam ve Enerji)
- **Maarif Modeli Kazanımı:** `FB.7.7.1`
- **Ders Kitabı Referansı:** 2. Kitap, s. 136–149 (Etkinlik Noktası: Piramitte Neler Değişir?)
- **Bilimsel Değişkenler:**
  * **Bağımsız Değişken:** Ekoloji piramidinin incelenen trofik basamağı (Üretici, 1. Tüketici/Otçul, 2. Tüketici/Etçil, 3. Tüketici/Tepe Yırtıcı) ve tarım ilacı (DDT) dozu.
  * **Bağımlı Değişken:** Aktarılan enerji miktarı (Joule), biyokütle (kg), birey sayısı ve vücutta biriken zehir yoğunluğu (ppm).
  * **Sabit Tutulan Değişkenler:** Güneş enerji girdisi ($100.000\text{ J}$), $\%10$ enerji aktarım kuralı.
- **İnteraktivite ve Fizik Motoru:**
  * Basamaklı 3D/2D ekoloji piramidi; öğrenci fareyle basamakların üzerine gelir veya pestisit slider'ını artırır.
  * Taban üreticide enerji $10.000\text{ J}$ iken tepe avcıda $10\text{ J}$'e iner. Buna karşın kırmızı renkli zehir parçacıkları üst basamaklara çıkıldıkça katlanarak yoğunlaşır (biyolojik birikim görselleştirmesi).
- **Gözlem ve Ölçüm Tablosu Taslağı:**

| Trofik Basamak | Canlı Örneği | Mevcut Enerji (J) | Toplam Biyokütle | Biyolojik Birikim (Zehir) |
| :---: | :---: | :---: | :---: | :---: |
| 1. Basamak (Üretici) | Fitoplankton / Bitki | $100.000\text{ J}$ | En Büyük ($10.000\text{ kg}$) | En Düşük ($0.05\text{ ppm}$) |
| 2. Basamak (1. Tüketici) | Zooplankton / Çekirge | $10.000\text{ J}$ | $1.000\text{ kg}$ | Düşük ($0.5\text{ ppm}$) |
| 3. Basamak (2. Tüketici) | Küçük Balık / Kurbağa | $1.000\text{ J}$ | $100\text{ kg}$ | Orta ($5\text{ ppm}$) |
| 4. Basamak (Tepe Tüketici) | Balıkçıl Kuş / Kartal | $100\text{ J}$ | En Az ($10\text{ kg}$) | En Yüksek ($50\text{ ppm}$ - Ölümcül!) |

---

## 4. Teknik Modül Mimarisi ve Arayüz Tasarımı

### 4.1. Teknoloji Yığını ve Sıfır Bağımlılık Prensibi
- **Saf Web Standartları:** HTML5, CSS3, Vanilla ES6+ JavaScript.
- **Grafik Motoru:** HTML5 Canvas 2D API (`CanvasRenderingContext2D`) ve vektörel interaktif SVG.
- **Harici Kütüphane Yasağı:** Three.js, Phaser, Matter.js, jQuery gibi harici framework'ler KESİNLİKLE kullanılmayacaktır. Bu sayede:
  * Sayfa yüklenme süresi < 100 ms kalır.
  * MEB internet filtrelerine (MEB Güvenli Ağ) takılmaz.
  * Pardus ETAP akıllı tahtalarda 60 FPS akıcı performans sağlanır.
- **Çoklu Platform ve Dokunmatik Zırhı:**
  * Fare (`mousedown, mousemove, mouseup`) ve Dokunmatik (`touchstart, touchmove, touchend`, `pointerdown, pointermove, pointerup`) olayları birleşik Pointer API ile dinlenir. Akıllı tahtalarda çift dokunma gecikmesi engellenir.

### 4.2. Arayüz Yerleşimi (Layout)
Deney modülü FenUp X içerisinde bağımsız bir sahne (`#scene-experiments`) olarak konumlandırılır:
1. **Navigasyon ve Filtreleme Başlığı:** Sınıf butonları (5, 6, 7. Sınıf) ve Ünite hapları (Pills).
2. **Deney Kartları Galerisi:** Her deney için görsel küçük resim, deney adı, kazanım kodu ve "Laboratuvara Gir" butonu.
3. **Deney Çalışma Alanı (Laboratuvar Ekranı):**
   - **Sol / Üst Alan (%65 Genişlik):** Etkileşimli Canvas 2D Fizik Simülasyonu.
   - **Sağ / Alt Alan (%35 Genişlik):**
     * *Değişkenler Rozeti:* Bağımsız, Bağımlı ve Sabit Tutulan Değişkenlerin açıkça belirtildiği bilgi kutucuğu.
     * *Kontrol Paneli:* Slider'lar, Açma/Kapama butonları, Malzeme Seçici listeler, "Sıfırla" ve "Veriyi Kaydet" butonları.
     * *İnteraktif Ölçüm Tablosu:* Öğrencinin simülasyondaki verileri anlık olarak satır satır ekleyebileceği ve sonuç çıkarımı yapabileceği tablo.

---

## 5. Pilot Deney Tavsiyesi (Faz 1 Uygulaması)

İlk etapta geliştirilecek en yüksek etkili pilot deney olarak:

### 🏆 PİLOT DENEY: **7. Sınıf 4. Ünite — Işığın Kırılması ve Sınır Açısı Simülatörü (Deney 7.3)**

#### Neden Bu Deney Seçilmeli?
1. **En Çok Kavram Yanılgısı İçeren Soyut Konu:** Öğrenciler "normale yaklaşma / normalden uzaklaşma", "kırılma açısı", "sınır açısı" ve "tam yansıma" kavramlarını tahtada sadece statik çizimlerle anlamakta çok zorlanmaktadır. Gerçek zamanlı bir lazer ışınının sıvı içinde kırıldığını görmek kavramsal netliği anında sağlar.
2. **Görsel ve Eğitsel Çekicilik:** Lazer kaynağının döndürülmesi, kırılan ve yansıyan ışınların açıölçer üzerinde gerçek zamanlı iz bırakması akıllı tahtada ders anlatan bir öğretmen için büyüleyici bir sunum aracıdır.
3. **Matematiksel ve Algoritmik Zarafet:** Saf trigonometri (`Math.sin`, `Math.cos`, `Math.asin`) ve Canvas 2D vektörel çizim fonksiyonları (`ctx.arc`, `ctx.lineTo`) ile sıfır harici kütüphane kullanılarak ~250 satır kodla kusursuz 60 FPS performans elde edilebilir.
4. **Dokunmatik Ergonomisi:** Öğrencinin akıllı tahta önünde parmağıyla lazer fenerini tutup döndürmesi son derece doğal ve sezgisel bir dokunmatik etkileşim sunar.
