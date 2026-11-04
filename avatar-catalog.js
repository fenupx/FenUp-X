// Approved collection v2. Legacy values resolve at display time; no profile migration.
const records = [
  {
    "id": "fenupx-v2-g01",
    "name": "Bilim meraklısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g02",
    "name": "Neşeli gözlemci",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g03",
    "name": "Doğa dostu",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g04",
    "name": "Kodlama tutkunu",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g05",
    "name": "Meraklı araştırmacı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g06",
    "name": "Dikkatli kâşif",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g07",
    "name": "Deney meraklısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g08",
    "name": "Yaratıcı tasarımcı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-g09",
    "name": "Gökyüzü gözlemcisi",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b01",
    "name": "Teknoloji meraklısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b02",
    "name": "Orman gözlemcisi",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b03",
    "name": "Bulmaca ustası",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b04",
    "name": "Robotik meraklısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b05",
    "name": "Yaratıcı mucit",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b06",
    "name": "Sessiz araştırmacı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b07",
    "name": "Enerjik kâşif",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b08",
    "name": "Uzay meraklısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-b09",
    "name": "Çevre araştırmacısı",
    "category": "ogrenciler"
  },
  {
    "id": "fenupx-v2-einstein",
    "name": "Albert Einstein",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-newton",
    "name": "Isaac Newton",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-curie",
    "name": "Marie Curie",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-sancar",
    "name": "Aziz Sancar",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-galileo",
    "name": "Galileo Galilei",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-gokdogan",
    "name": "Nüzhet Gökdoğan",
    "category": "bilim"
  },
  {
    "id": "fenupx-v2-owl",
    "name": "Doğa araştırmacısı baykuş",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-fox",
    "name": "Kâşif tilki",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-red-panda",
    "name": "Orman kâşifi kızıl panda",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-snow-leopard",
    "name": "Dağ kâşifi kar leoparı",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-otter",
    "name": "Su araştırmacısı su samuru",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-penguin",
    "name": "Kutup kâşifi penguen",
    "category": "hayvanlar"
  },
  {
    "id": "fenupx-v2-astronaut",
    "name": "Astronot",
    "category": "uzay"
  },
  {
    "id": "fenupx-v2-robot",
    "name": "Keşif robotu",
    "category": "uzay"
  },
  {
    "id": "fenupx-v2-alien",
    "name": "Yıldız haritacısı",
    "category": "uzay"
  },
  {
    "id": "fenupx-v2-android",
    "name": "Bakır android",
    "category": "uzay"
  },
  {
    "id": "fenupx-v2-lunar-engineer",
    "name": "Ay mühendisi",
    "category": "uzay"
  },
  {
    "id": "fenupx-v2-space-botanist",
    "name": "Uzay botanikçisi",
    "category": "uzay"
  }
];
export const LEGACY_AVATAR_IDS = Object.freeze({
  "av_robot_astrobot": "fenupx-v2-robot",
  "av_robot_nano": "fenupx-v2-android",
  "av_robot_sparky": "fenupx-v2-robot",
  "av_robot_panda": "fenupx-v2-red-panda",
  "av_robot_rover": "fenupx-v2-lunar-engineer",
  "av_robot_quantum": "fenupx-v2-android",
  "av_robot_drone": "fenupx-v2-alien",
  "av_robot_cyberfox": "fenupx-v2-fox",
  "av_hayvan_cat": "fenupx-v2-snow-leopard",
  "av_hayvan_fox": "fenupx-v2-fox",
  "av_hayvan_owl": "fenupx-v2-owl",
  "av_hayvan_dino": "fenupx-v2-red-panda",
  "av_hayvan_bunny": "fenupx-v2-otter",
  "av_hayvan_bear": "fenupx-v2-penguin",
  "av_hayvan_otter": "fenupx-v2-otter",
  "av_hayvan_koala": "fenupx-v2-red-panda",
  "av_ogrenci_genc_kiz": "fenupx-v2-g02",
  "av_ogrenci_genc_erkek": "fenupx-v2-b07",
  "av_ogrenci_gozluklu_kiz": "fenupx-v2-g01",
  "av_ogrenci_kulaklikli_erkek": "fenupx-v2-b03",
  "av_ogrenci_kivircik_kiz": "fenupx-v2-g08",
  "av_ogrenci_sportif_erkek": "fenupx-v2-b08",
  "av_ogrenci_sanatci_kiz": "fenupx-v2-g06",
  "av_ogrenci_astronot_genc": "fenupx-v2-b04",
  "av_bilim_einstein": "fenupx-v2-einstein",
  "av_bilim_curie": "fenupx-v2-curie",
  "av_bilim_ali_kuscu": "fenupx-v2-galileo",
  "av_bilim_newton": "fenupx-v2-newton",
  "av_bilim_galileo": "fenupx-v2-galileo",
  "av_bilim_tesla": "fenupx-v2-sancar",
  "av_bilim_el_cezeri": "fenupx-v2-newton",
  "av_bilim_genc_kadin_arastirmaci": "fenupx-v2-gokdogan"
});
export const DEFAULT_AVATAR_ID = 'fenupx-v2-g01';
const byId = new Map(records.map(a=>[a.id,a]));
export function resolveAvatarId(value) {
 if(typeof value!=='string'||value.length>100000)return DEFAULT_AVATAR_ID;
 if(byId.has(value))return value;
 if(Object.hasOwn(LEGACY_AVATAR_IDS,value))return LEGACY_AVATAR_IDS[value];
 let decoded=value;
 try{if(value.startsWith('data:image/svg+xml;base64,'))decoded=atob(value.slice(value.indexOf(',')+1));else decoded=decodeURIComponent(value);}catch{return DEFAULT_AVATAR_ID;}
 const legacy=decoded.match(/g_(av_[a-z0-9_]+)/)?.[1];
 if(legacy&&Object.hasOwn(LEGACY_AVATAR_IDS,legacy))return LEGACY_AVATAR_IDS[legacy];
 const compatibilityId=decoded.match(/\/(fenupx-v2-[a-z0-9-]+)(?:[?#]|$)/)?.[1];
 if(compatibilityId&&byId.has(compatibilityId))return compatibilityId;
 const filename=decoded.match(/\/assets\/avatars\/v2\/([a-z0-9-]+)-(?:96|192|384)\.webp(?:[?#]|$)/)?.[1];
 return filename&&byId.has('fenupx-v2-'+filename)?'fenupx-v2-'+filename:DEFAULT_AVATAR_ID;
}
export function avatarUrl(value,size=96) {
 const id=resolveAvatarId(value),width=[96,192,384].includes(size)?size:96;
 return new URL(`./assets/avatars/v2/${id.replace('fenupx-v2-','')}-${width}.webp`,import.meta.url).href;
}
export const AVATARS = Object.freeze(records.map(a=>Object.freeze({...a,url:avatarUrl(a.id)})));
export const avatarName = value => byId.get(resolveAvatarId(value)).name;
