import "dotenv/config";
import { PrismaClient, CertCategory } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const Q = "한국산업인력공단";
const CCI = "대한상공회의소";
const KCA = "한국방송통신전파진흥원";
const FSS = "금융감독원";
const KMIB = "한국보건의료인국가시험원";
const DATAQ = "한국데이터산업진흥원";
const HIST = "국사편찬위원회";
const KTAX = "한국세무사회";
const KICPA = "한국공인회계사회";
const KPC = "한국생산성본부";
const KAIT = "한국정보통신진흥협회";
const KFIA = "금융투자협회";
const KFPSB = "한국FPSB";
const KBII = "한국금융연수원";

type CertInput = {
  nameKo: string;
  nameEn?: string;
  category: CertCategory;
  subcategory?: string;
  grade?: string;
  issuingAuthority: string;
  officialUrl?: string;
};

const certifications: CertInput[] = [
  // ── 국가기술자격 / IT ──────────────────────────────────────────
  { nameKo: "정보처리기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "정보처리산업기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "산업기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "정보보안기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "빅데이터분석기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "정보통신기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "기사", issuingAuthority: KCA, officialUrl: "https://www.kca.kr" },
  { nameKo: "컴퓨터활용능력 1급", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "1급", issuingAuthority: CCI, officialUrl: "https://license.korcham.net" },
  { nameKo: "컴퓨터활용능력 2급", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "2급", issuingAuthority: CCI, officialUrl: "https://license.korcham.net" },
  { nameKo: "워드프로세서", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "IT", grade: "단일등급", issuingAuthority: CCI, officialUrl: "https://license.korcham.net" },

  // ── 국가기술자격 / 건축·토목 ──────────────────────────────────
  { nameKo: "건축기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "건축/토목", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "토목기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "건축/토목", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "건축설비기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "건축/토목", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "조경기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "건축/토목", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "측량 및 지형공간정보기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "건축/토목", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 기계·금속 ──────────────────────────────────
  { nameKo: "일반기계기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "기계/금속", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "건설기계설비기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "기계/금속", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "용접기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "기계/금속", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "금속재료기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "기계/금속", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 전기·전자 ──────────────────────────────────
  { nameKo: "전기기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "전기/전자", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "전기산업기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "전기/전자", grade: "산업기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "전기기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "전기/전자", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "전자기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "전기/전자", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "소방설비기사(전기)", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "전기/전자", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "소방설비기사(기계)", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "안전관리", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 화공·환경 ──────────────────────────────────
  { nameKo: "화공기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "화공/환경", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "대기환경기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "화공/환경", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "수질환경기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "화공/환경", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "폐기물처리기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "화공/환경", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 안전관리 ───────────────────────────────────
  { nameKo: "산업안전기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "안전관리", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "건설안전기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "안전관리", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "가스기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "안전관리", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 식품·조리 ──────────────────────────────────
  { nameKo: "조주기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "한식조리기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "양식조리기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "중식조리기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "일식조리기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "제과기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "제빵기능사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기능사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "식품기사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "식품/조리", grade: "기사", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가기술자격 / 서비스 ─────────────────────────────────────
  { nameKo: "직업상담사 1급", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "서비스", grade: "1급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "직업상담사 2급", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "서비스", grade: "2급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "사회조사분석사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "서비스", grade: "2급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "컨벤션기획사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "서비스", grade: "2급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "텔레마케팅관리사", category: CertCategory.NATIONAL_TECHNICAL, subcategory: "서비스", grade: "단일등급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가전문자격 / 의료·보건 ──────────────────────────────────
  { nameKo: "의사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "치과의사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "한의사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "약사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "간호사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "간호조무사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "물리치료사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "임상병리사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "방사선사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "영양사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },
  { nameKo: "위생사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "의료/보건", issuingAuthority: KMIB, officialUrl: "https://www.kuksiwon.or.kr" },

  // ── 국가전문자격 / 법률 ───────────────────────────────────────
  { nameKo: "변호사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "법률", issuingAuthority: "법무부", officialUrl: "https://www.moj.go.kr" },
  { nameKo: "법무사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "법률", issuingAuthority: "법무부", officialUrl: "https://www.moj.go.kr" },
  { nameKo: "변리사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "법률", issuingAuthority: "특허청", officialUrl: "https://www.kipo.go.kr" },
  { nameKo: "행정사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "법률", issuingAuthority: "행정안전부", officialUrl: "https://www.mois.go.kr" },
  { nameKo: "공인노무사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "법률/노무", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가전문자격 / 회계·세무 ──────────────────────────────────
  { nameKo: "공인회계사", nameEn: "CPA", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "회계/세무", issuingAuthority: FSS, officialUrl: "https://www.fss.or.kr" },
  { nameKo: "세무사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "회계/세무", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가전문자격 / 부동산·감정 ───────────────────────────────
  { nameKo: "공인중개사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "부동산", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "감정평가사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "부동산", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "주택관리사보", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "부동산", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가전문자격 / 금융·보험 ──────────────────────────────────
  { nameKo: "보험계리사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "금융/보험", issuingAuthority: FSS, officialUrl: "https://www.fss.or.kr" },
  { nameKo: "손해사정사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "금융/보험", issuingAuthority: FSS, officialUrl: "https://www.fss.or.kr" },
  { nameKo: "보험중개사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "금융/보험", issuingAuthority: FSS, officialUrl: "https://www.fss.or.kr" },

  // ── 국가전문자격 / 건축 ───────────────────────────────────────
  { nameKo: "건축사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "건축/기술", issuingAuthority: "한국건축사협회", officialUrl: "https://www.kira.or.kr" },

  // ── 국가전문자격 / 노무·복지 ──────────────────────────────────
  { nameKo: "사회복지사 1급", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "노무/복지", grade: "1급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "직업능력개발훈련교사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "노무/복지", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },

  // ── 국가전문자격 / 무역·물류 ──────────────────────────────────
  { nameKo: "관세사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "무역/물류", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "물류관리사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "무역/물류", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "국제무역사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "무역/물류", issuingAuthority: "한국무역협회", officialUrl: "https://www.kita.net" },

  // ── 국가전문자격 / 교육 ───────────────────────────────────────
  { nameKo: "평생교육사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "교육", grade: "2급", issuingAuthority: "국가평생교육진흥원", officialUrl: "https://www.nile.or.kr" },
  { nameKo: "한국어교원", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "교육", grade: "2급", issuingAuthority: "국립국어원", officialUrl: "https://www.korean.go.kr" },
  { nameKo: "청소년상담사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "교육", grade: "3급", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "청소년지도사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "교육", grade: "2급", issuingAuthority: "한국청소년활동진흥원", officialUrl: "https://www.kywa.or.kr" },

  // ── 국가전문자격 / 기타 ───────────────────────────────────────
  { nameKo: "소방시설관리사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "안전관리", issuingAuthority: Q, officialUrl: "https://www.q-net.or.kr" },
  { nameKo: "경비지도사", category: CertCategory.NATIONAL_PROFESSIONAL, subcategory: "안전관리", issuingAuthority: "경찰청", officialUrl: "https://www.police.go.kr" },

  // ── 민간공인 / 한국사 ─────────────────────────────────────────
  { nameKo: "한국사능력검정시험 심화", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "한국사", grade: "심화(1~3급)", issuingAuthority: HIST, officialUrl: "https://www.historyexam.go.kr" },
  { nameKo: "한국사능력검정시험 기본", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "한국사", grade: "기본(4~6급)", issuingAuthority: HIST, officialUrl: "https://www.historyexam.go.kr" },

  // ── 민간공인 / 어학 ───────────────────────────────────────────
  { nameKo: "TOEIC", nameEn: "Test of English for International Communication", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "YBM", officialUrl: "https://www.toeic.co.kr" },
  { nameKo: "TOEFL", nameEn: "Test of English as a Foreign Language", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "ETS", officialUrl: "https://www.ets.org/toefl" },
  { nameKo: "TEPS", nameEn: "Test of English Proficiency developed by Seoul National Univ.", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "서울대학교 TEPS관리위원회", officialUrl: "https://www.teps.or.kr" },
  { nameKo: "OPIc", nameEn: "Oral Proficiency Interview-computer", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "한국ACTFL OPIc", officialUrl: "https://www.opic.or.kr" },
  { nameKo: "JLPT", nameEn: "Japanese Language Proficiency Test", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "일본국제교류기금", officialUrl: "https://www.jlpt.jp" },
  { nameKo: "HSK", nameEn: "Hànyǔ Shuǐpíng Kǎoshì", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "한국공자아카데미", officialUrl: "https://www.hsk.or.kr" },
  { nameKo: "KBS한국어능력시험", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "어학", issuingAuthority: "KBS", officialUrl: "https://www.kbs.co.kr/koreanlang" },

  // ── 민간공인 / 금융·투자 ──────────────────────────────────────
  { nameKo: "투자자산운용사", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFIA, officialUrl: "https://www.kofia.or.kr" },
  { nameKo: "펀드투자권유자문인력", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFIA, officialUrl: "https://www.kofia.or.kr" },
  { nameKo: "파생상품투자권유자문인력", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFIA, officialUrl: "https://www.kofia.or.kr" },
  { nameKo: "증권투자권유자문인력", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFIA, officialUrl: "https://www.kofia.or.kr" },
  { nameKo: "AFPK", nameEn: "Associate Financial Planner Korea", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFPSB, officialUrl: "https://www.fpsb.co.kr" },
  { nameKo: "CFP", nameEn: "Certified Financial Planner", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KFPSB, officialUrl: "https://www.fpsb.co.kr" },
  { nameKo: "신용분석사", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KBII, officialUrl: "https://www.kbi.or.kr" },
  { nameKo: "자산관리사(FP)", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "금융/투자", issuingAuthority: KBII, officialUrl: "https://www.kbi.or.kr" },

  // ── 민간공인 / 회계 ───────────────────────────────────────────
  { nameKo: "전산회계 1급", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", grade: "1급", issuingAuthority: KTAX, officialUrl: "https://www.kacpta.or.kr" },
  { nameKo: "전산회계 2급", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", grade: "2급", issuingAuthority: KTAX, officialUrl: "https://www.kacpta.or.kr" },
  { nameKo: "전산세무 1급", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", grade: "1급", issuingAuthority: KTAX, officialUrl: "https://www.kacpta.or.kr" },
  { nameKo: "전산세무 2급", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", grade: "2급", issuingAuthority: KTAX, officialUrl: "https://www.kacpta.or.kr" },
  { nameKo: "FAT", nameEn: "Financial Accounting Technician", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", issuingAuthority: KICPA, officialUrl: "https://www.kicpa.or.kr" },
  { nameKo: "TAT", nameEn: "Tax Accounting Technician", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", issuingAuthority: KICPA, officialUrl: "https://www.kicpa.or.kr" },
  { nameKo: "ERP정보관리사", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "회계", issuingAuthority: KPC, officialUrl: "https://www.kpc.or.kr" },

  // ── 민간공인 / IT·OA ──────────────────────────────────────────
  { nameKo: "ITQ", nameEn: "Information Technology Qualification", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/OA", issuingAuthority: KPC, officialUrl: "https://www.itq.or.kr" },
  { nameKo: "MOS", nameEn: "Microsoft Office Specialist", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/OA", issuingAuthority: "영진닷컴", officialUrl: "https://www.ybmit.com" },
  { nameKo: "리눅스마스터", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/OA", grade: "1급", issuingAuthority: KAIT, officialUrl: "https://www.ihd.or.kr" },
  { nameKo: "SQLD", nameEn: "SQL Developer", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/DB", issuingAuthority: DATAQ, officialUrl: "https://www.dataq.or.kr" },
  { nameKo: "SQLP", nameEn: "SQL Professional", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/DB", issuingAuthority: DATAQ, officialUrl: "https://www.dataq.or.kr" },
  { nameKo: "ADsP", nameEn: "Advanced Data Analytics Semi-Professional", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/데이터", issuingAuthority: DATAQ, officialUrl: "https://www.dataq.or.kr" },
  { nameKo: "ADP", nameEn: "Advanced Data Professional", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/데이터", issuingAuthority: DATAQ, officialUrl: "https://www.dataq.or.kr" },
  { nameKo: "정보보안전문가", nameEn: "SIS", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "IT/보안", issuingAuthority: KAIT, officialUrl: "https://www.ihd.or.kr" },

  // ── 민간공인 / 한자·국어 ──────────────────────────────────────
  { nameKo: "한자능력검정시험", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "한자/국어", issuingAuthority: "한국어문회", officialUrl: "https://www.hanja.re.kr" },
  { nameKo: "실용한자", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "한자/국어", issuingAuthority: "대한검정회", officialUrl: "https://www.hanja114.org" },
  { nameKo: "한국실용글쓰기검정", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "한자/국어", issuingAuthority: "한국국어능력평가협회", officialUrl: "https://www.klat.or.kr" },

  // ── 민간공인 / 무역·사무 ──────────────────────────────────────
  { nameKo: "무역영어", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "무역/사무", grade: "1급", issuingAuthority: CCI, officialUrl: "https://license.korcham.net" },
  { nameKo: "비서", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "무역/사무", grade: "1급", issuingAuthority: CCI, officialUrl: "https://license.korcham.net" },

  // ── 민간공인 / 디자인·기타 ────────────────────────────────────
  { nameKo: "GTQ", nameEn: "Graphic Technology Qualification", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "디자인", issuingAuthority: KPC, officialUrl: "https://www.gtq.or.kr" },
  { nameKo: "브레인트레이너", category: CertCategory.PRIVATE_CERTIFIED, subcategory: "기타", issuingAuthority: "한국뇌과학연구원", officialUrl: "https://www.braintrainer.or.kr" },
];

// 헬퍼: 시험일 09:00 KST 기준 Date 생성
function d(dateStr: string): Date {
  return new Date(`${dateStr}T09:00:00+09:00`);
}

type SessionInput = {
  id: string;
  certificationId: string;
  sessionYear: number;
  sessionRound: number;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  examDateWritten?: Date;
  examDatePractical?: Date;
  resultAnnouncementAt?: Date;
  examFee?: number;
  subjects?: string;
  announcementUrl?: string;
  applicationUrl?: string;
  source?: string;
};

// ─── 2026년 시험 일정 ──────────────────────────────────────────

const sessions: SessionInput[] = [
  // ═══ 정보처리기사 ═══════════════════════════════════════════
  {
    id: "session-처리기사-2026-1",
    certificationId: "seed-정보처리기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-15"), examDatePractical: d("2026-04-19"),
    resultAnnouncementAt: d("2026-06-06"), examFee: 19400,
    subjects: "소프트웨어 설계, 소프트웨어 개발, 데이터베이스 구축, 프로그래밍 언어 활용, 정보시스템 구축 관리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-처리기사-2026-2",
    certificationId: "seed-정보처리기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-09-19"), examFee: 19400,
    subjects: "소프트웨어 설계, 소프트웨어 개발, 데이터베이스 구축, 프로그래밍 언어 활용, 정보시스템 구축 관리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-처리기사-2026-3",
    certificationId: "seed-정보처리기사",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-01"),
    resultAnnouncementAt: d("2026-12-12"), examFee: 19400,
    subjects: "소프트웨어 설계, 소프트웨어 개발, 데이터베이스 구축, 프로그래밍 언어 활용, 정보시스템 구축 관리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 빅데이터분석기사 ════════════════════════════════════════
  {
    id: "session-빅데이터-2026-1",
    certificationId: "seed-빅데이터분석기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-03-02"), applicationEndAt: d("2026-03-06"),
    examDateWritten: d("2026-04-04"), examDatePractical: d("2026-05-31"),
    resultAnnouncementAt: d("2026-06-27"), examFee: 19400,
    subjects: "빅데이터 분석 기획, 빅데이터 탐색, 빅데이터 모델링, 빅데이터 결과 해석",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-빅데이터-2026-2",
    certificationId: "seed-빅데이터분석기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-08-17"), applicationEndAt: d("2026-08-21"),
    examDateWritten: d("2026-09-05"), examDatePractical: d("2026-10-25"),
    resultAnnouncementAt: d("2026-11-28"), examFee: 19400,
    subjects: "빅데이터 분석 기획, 빅데이터 탐색, 빅데이터 모델링, 빅데이터 결과 해석",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 정보보안기사 ════════════════════════════════════════════
  {
    id: "session-정보보안기사-2026-1",
    certificationId: "seed-정보보안기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-06"),
    examDateWritten: d("2026-03-14"), examDatePractical: d("2026-05-09"),
    resultAnnouncementAt: d("2026-06-20"), examFee: 19400,
    subjects: "시스템 보안, 네트워크 보안, 애플리케이션 보안, 정보보안 일반, 정보보안 관리 및 법규",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-정보보안기사-2026-2",
    certificationId: "seed-정보보안기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-07-10"),
    examDateWritten: d("2026-08-08"), examDatePractical: d("2026-10-04"),
    resultAnnouncementAt: d("2026-11-07"), examFee: 19400,
    subjects: "시스템 보안, 네트워크 보안, 애플리케이션 보안, 정보보안 일반, 정보보안 관리 및 법규",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 전기기사 ════════════════════════════════════════════════
  {
    id: "session-전기기사-2026-1",
    certificationId: "seed-전기기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-12"),
    resultAnnouncementAt: d("2026-06-13"), examFee: 19400,
    subjects: "전기자기학, 전력공학, 전기기기, 회로이론 및 제어공학, 전기설비기술기준",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-전기기사-2026-2",
    certificationId: "seed-전기기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-06-09"), applicationEndAt: d("2026-06-18"),
    examDateWritten: d("2026-07-05"), examDatePractical: d("2026-08-30"),
    resultAnnouncementAt: d("2026-09-20"), examFee: 19400,
    subjects: "전기자기학, 전력공학, 전기기기, 회로이론 및 제어공학, 전기설비기술기준",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-전기기사-2026-3",
    certificationId: "seed-전기기사",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-10-12"), applicationEndAt: d("2026-10-21"),
    examDateWritten: d("2026-11-14"), examDatePractical: d("2026-12-27"),
    resultAnnouncementAt: d("2027-02-14"), examFee: 19400,
    subjects: "전기자기학, 전력공학, 전기기기, 회로이론 및 제어공학, 전기설비기술기준",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 산업안전기사 ════════════════════════════════════════════
  {
    id: "session-산업안전기사-2026-1",
    certificationId: "seed-산업안전기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-26"),
    resultAnnouncementAt: d("2026-06-06"), examFee: 19400,
    subjects: "기계위험방지기술, 전기위험방지기술, 화학설비위험방지기술, 건설안전기술, 산업안전관리론",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-산업안전기사-2026-2",
    certificationId: "seed-산업안전기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-09-20"), examFee: 19400,
    subjects: "기계위험방지기술, 전기위험방지기술, 화학설비위험방지기술, 건설안전기술, 산업안전관리론",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-산업안전기사-2026-3",
    certificationId: "seed-산업안전기사",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"),
    resultAnnouncementAt: d("2026-12-12"), examFee: 19400,
    subjects: "기계위험방지기술, 전기위험방지기술, 화학설비위험방지기술, 건설안전기술, 산업안전관리론",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 건설안전기사 ════════════════════════════════════════════
  {
    id: "session-건설안전기사-2026-1",
    certificationId: "seed-건설안전기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-26"),
    resultAnnouncementAt: d("2026-06-06"), examFee: 19400,
    subjects: "산업안전관리론, 산업심리 및 교육, 인간공학 및 시스템안전공학, 건설시공학, 건설재료학, 건설안전기술",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-건설안전기사-2026-2",
    certificationId: "seed-건설안전기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-09-20"), examFee: 19400,
    subjects: "산업안전관리론, 산업심리 및 교육, 인간공학 및 시스템안전공학, 건설시공학, 건설재료학, 건설안전기술",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-건설안전기사-2026-3",
    certificationId: "seed-건설안전기사",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"),
    resultAnnouncementAt: d("2026-12-12"), examFee: 19400,
    subjects: "산업안전관리론, 산업심리 및 교육, 인간공학 및 시스템안전공학, 건설시공학, 건설재료학, 건설안전기술",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 소방설비기사(전기) ══════════════════════════════════════
  {
    id: "session-소방설비기사전기-2026-1",
    certificationId: "seed-소방설비기사(전기)",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-26"),
    resultAnnouncementAt: d("2026-06-13"), examFee: 19400,
    subjects: "소방원론, 소방전기일반, 소방관계법규, 소방전기시설의 구조 및 원리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-소방설비기사전기-2026-2",
    certificationId: "seed-소방설비기사(전기)",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-09-20"), examFee: 19400,
    subjects: "소방원론, 소방전기일반, 소방관계법규, 소방전기시설의 구조 및 원리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-소방설비기사전기-2026-3",
    certificationId: "seed-소방설비기사(전기)",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"),
    resultAnnouncementAt: d("2026-12-12"), examFee: 19400,
    subjects: "소방원론, 소방전기일반, 소방관계법규, 소방전기시설의 구조 및 원리",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 화공기사 ════════════════════════════════════════════════
  {
    id: "session-화공기사-2026-1",
    certificationId: "seed-화공기사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-12"),
    resultAnnouncementAt: d("2026-06-13"), examFee: 19400,
    subjects: "화공열역학, 유체역학, 화학반응공학, 단위조작 및 화학공업양론, 공정제어",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-화공기사-2026-2",
    certificationId: "seed-화공기사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-09-20"), examFee: 19400,
    subjects: "화공열역학, 유체역학, 화학반응공학, 단위조작 및 화학공업양론, 공정제어",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-화공기사-2026-3",
    certificationId: "seed-화공기사",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-01"),
    resultAnnouncementAt: d("2026-12-12"), examFee: 19400,
    subjects: "화공열역학, 유체역학, 화학반응공학, 단위조작 및 화학공업양론, 공정제어",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 컴퓨터활용능력 1급 ══════════════════════════════════════
  {
    id: "session-컴활1-2026-1",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-23"),
    examDateWritten: d("2026-01-24"), examDatePractical: d("2026-02-22"),
    resultAnnouncementAt: d("2026-03-06"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활1-2026-2",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-03-10"), applicationEndAt: d("2026-03-26"),
    examDateWritten: d("2026-03-29"), examDatePractical: d("2026-04-19"),
    resultAnnouncementAt: d("2026-05-01"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활1-2026-3",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-28"),
    examDateWritten: d("2026-05-31"), examDatePractical: d("2026-06-21"),
    resultAnnouncementAt: d("2026-07-04"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활1-2026-4",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 4,
    applicationStartAt: d("2026-07-01"), applicationEndAt: d("2026-07-15"),
    examDateWritten: d("2026-07-19"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-08-21"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활1-2026-5",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 5,
    applicationStartAt: d("2026-09-08"), applicationEndAt: d("2026-09-24"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-10-18"),
    resultAnnouncementAt: d("2026-10-30"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활1-2026-6",
    certificationId: "seed-컴퓨터활용능력 1급",
    sessionYear: 2026, sessionRound: 6,
    applicationStartAt: d("2026-11-10"), applicationEndAt: d("2026-11-26"),
    examDateWritten: d("2026-11-29"), examDatePractical: d("2026-12-20"),
    resultAnnouncementAt: d("2027-01-08"), examFee: 19000,
    subjects: "컴퓨터 일반, 스프레드시트 일반, 데이터베이스 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },

  // ═══ 컴퓨터활용능력 2급 ══════════════════════════════════════
  {
    id: "session-컴활2-2026-1",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-23"),
    examDateWritten: d("2026-01-24"), examDatePractical: d("2026-02-22"),
    resultAnnouncementAt: d("2026-03-06"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활2-2026-2",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-03-10"), applicationEndAt: d("2026-03-26"),
    examDateWritten: d("2026-03-29"), examDatePractical: d("2026-04-19"),
    resultAnnouncementAt: d("2026-05-01"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활2-2026-3",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 3,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-28"),
    examDateWritten: d("2026-05-31"), examDatePractical: d("2026-06-21"),
    resultAnnouncementAt: d("2026-07-04"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활2-2026-4",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 4,
    applicationStartAt: d("2026-07-01"), applicationEndAt: d("2026-07-15"),
    examDateWritten: d("2026-07-19"), examDatePractical: d("2026-08-09"),
    resultAnnouncementAt: d("2026-08-21"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활2-2026-5",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 5,
    applicationStartAt: d("2026-09-08"), applicationEndAt: d("2026-09-24"),
    examDateWritten: d("2026-09-27"), examDatePractical: d("2026-10-18"),
    resultAnnouncementAt: d("2026-10-30"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },
  {
    id: "session-컴활2-2026-6",
    certificationId: "seed-컴퓨터활용능력 2급",
    sessionYear: 2026, sessionRound: 6,
    applicationStartAt: d("2026-11-10"), applicationEndAt: d("2026-11-26"),
    examDateWritten: d("2026-11-29"), examDatePractical: d("2026-12-20"),
    resultAnnouncementAt: d("2027-01-08"), examFee: 16000,
    subjects: "컴퓨터 일반, 스프레드시트 일반",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  },

  // ═══ 한국사능력검정시험 심화 ══════════════════════════════════
  {
    id: "session-한국사심화-2026-68",
    certificationId: "seed-한국사능력검정시험 심화",
    sessionYear: 2026, sessionRound: 68,
    applicationStartAt: d("2026-01-08"), applicationEndAt: d("2026-01-21"),
    examDateWritten: d("2026-02-07"), resultAnnouncementAt: d("2026-02-26"),
    examFee: 10000,
    subjects: "한국사 (심화: 1~3급)",
    announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회",
  },
  {
    id: "session-한국사심화-2026-69",
    certificationId: "seed-한국사능력검정시험 심화",
    sessionYear: 2026, sessionRound: 69,
    applicationStartAt: d("2026-03-30"), applicationEndAt: d("2026-04-10"),
    examDateWritten: d("2026-05-02"), resultAnnouncementAt: d("2026-05-22"),
    examFee: 10000,
    subjects: "한국사 (심화: 1~3급)",
    announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회",
  },
  {
    id: "session-한국사-2026-70",
    certificationId: "seed-한국사능력검정시험 심화",
    sessionYear: 2026, sessionRound: 70,
    applicationStartAt: d("2026-07-07"), applicationEndAt: d("2026-07-18"),
    examDateWritten: d("2026-08-08"), resultAnnouncementAt: d("2026-08-28"),
    examFee: 10000,
    subjects: "한국사 (심화: 1~3급)",
    announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회",
  },
  {
    id: "session-한국사심화-2026-71",
    certificationId: "seed-한국사능력검정시험 심화",
    sessionYear: 2026, sessionRound: 71,
    applicationStartAt: d("2026-09-22"), applicationEndAt: d("2026-10-02"),
    examDateWritten: d("2026-10-24"), resultAnnouncementAt: d("2026-11-12"),
    examFee: 10000,
    subjects: "한국사 (심화: 1~3급)",
    announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회",
  },
  {
    id: "session-한국사심화-2026-72",
    certificationId: "seed-한국사능력검정시험 심화",
    sessionYear: 2026, sessionRound: 72,
    applicationStartAt: d("2026-11-09"), applicationEndAt: d("2026-11-20"),
    examDateWritten: d("2026-12-12"), resultAnnouncementAt: d("2027-01-08"),
    examFee: 10000,
    subjects: "한국사 (심화: 1~3급)",
    announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회",
  },

  // ═══ SQLD ════════════════════════════════════════════════════
  {
    id: "session-sqld-2026-51",
    certificationId: "seed-SQLD",
    sessionYear: 2026, sessionRound: 51,
    applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-24"),
    examDateWritten: d("2026-02-22"), resultAnnouncementAt: d("2026-03-21"),
    examFee: 50000,
    subjects: "데이터 모델링의 이해, SQL 기본 및 활용",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-sqld-2026-52",
    certificationId: "seed-SQLD",
    sessionYear: 2026, sessionRound: 52,
    applicationStartAt: d("2026-04-14"), applicationEndAt: d("2026-04-25"),
    examDateWritten: d("2026-05-24"), resultAnnouncementAt: d("2026-06-27"),
    examFee: 50000,
    subjects: "데이터 모델링의 이해, SQL 기본 및 활용",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-sqld-2026-2",
    certificationId: "seed-SQLD",
    sessionYear: 2026, sessionRound: 53,
    applicationStartAt: d("2026-07-14"), applicationEndAt: d("2026-07-25"),
    examDateWritten: d("2026-08-29"), resultAnnouncementAt: d("2026-09-26"),
    examFee: 50000,
    subjects: "데이터 모델링의 이해, SQL 기본 및 활용",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-sqld-2026-54",
    certificationId: "seed-SQLD",
    sessionYear: 2026, sessionRound: 54,
    applicationStartAt: d("2026-10-13"), applicationEndAt: d("2026-10-24"),
    examDateWritten: d("2026-11-22"), resultAnnouncementAt: d("2026-12-26"),
    examFee: 50000,
    subjects: "데이터 모델링의 이해, SQL 기본 및 활용",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },

  // ═══ ADsP ════════════════════════════════════════════════════
  {
    id: "session-adsp-2026-36",
    certificationId: "seed-ADsP",
    sessionYear: 2026, sessionRound: 36,
    applicationStartAt: d("2026-02-10"), applicationEndAt: d("2026-02-21"),
    examDateWritten: d("2026-03-21"), resultAnnouncementAt: d("2026-04-18"),
    examFee: 50000,
    subjects: "데이터 이해, 데이터 분석 기획, 데이터 분석, 데이터 시각화",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-adsp-2026-37",
    certificationId: "seed-ADsP",
    sessionYear: 2026, sessionRound: 37,
    applicationStartAt: d("2026-05-11"), applicationEndAt: d("2026-05-22"),
    examDateWritten: d("2026-06-21"), resultAnnouncementAt: d("2026-07-11"),
    examFee: 50000,
    subjects: "데이터 이해, 데이터 분석 기획, 데이터 분석, 데이터 시각화",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-adsp-2026-38",
    certificationId: "seed-ADsP",
    sessionYear: 2026, sessionRound: 38,
    applicationStartAt: d("2026-08-10"), applicationEndAt: d("2026-08-21"),
    examDateWritten: d("2026-09-13"), resultAnnouncementAt: d("2026-10-10"),
    examFee: 50000,
    subjects: "데이터 이해, 데이터 분석 기획, 데이터 분석, 데이터 시각화",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-adsp-2026-39",
    certificationId: "seed-ADsP",
    sessionYear: 2026, sessionRound: 39,
    applicationStartAt: d("2026-11-02"), applicationEndAt: d("2026-11-13"),
    examDateWritten: d("2026-11-29"), resultAnnouncementAt: d("2026-12-27"),
    examFee: 50000,
    subjects: "데이터 이해, 데이터 분석 기획, 데이터 분석, 데이터 시각화",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },

  // ═══ ADP ═════════════════════════════════════════════════════
  {
    id: "session-adp-2026-36",
    certificationId: "seed-ADP",
    sessionYear: 2026, sessionRound: 36,
    applicationStartAt: d("2026-02-10"), applicationEndAt: d("2026-02-21"),
    examDateWritten: d("2026-03-21"), resultAnnouncementAt: d("2026-05-09"),
    examFee: 100000,
    subjects: "데이터 이해, 데이터 처리기술 이해, 데이터 분석, 데이터 시각화, 빅데이터 기술 및 제도",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },
  {
    id: "session-adp-2026-37",
    certificationId: "seed-ADP",
    sessionYear: 2026, sessionRound: 37,
    applicationStartAt: d("2026-08-10"), applicationEndAt: d("2026-08-21"),
    examDateWritten: d("2026-09-13"), resultAnnouncementAt: d("2026-10-31"),
    examFee: 100000,
    subjects: "데이터 이해, 데이터 처리기술 이해, 데이터 분석, 데이터 시각화, 빅데이터 기술 및 제도",
    announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원",
  },

  // ═══ 공인중개사 (제37회) ══════════════════════════════════════
  {
    id: "session-공인중개사-2026-37",
    certificationId: "seed-공인중개사",
    sessionYear: 2026, sessionRound: 37,
    applicationStartAt: d("2026-08-10"), applicationEndAt: d("2026-08-28"),
    examDateWritten: d("2026-10-25"), examDatePractical: d("2026-11-08"),
    resultAnnouncementAt: d("2026-12-03"), examFee: 32000,
    subjects: "1차: 부동산학개론·민법 및 민사특별법 / 2차: 공인중개사법·부동산공법·부동산공시법·부동산세법",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 세무사 (제63회) ══════════════════════════════════════════
  {
    id: "session-세무사-2026-1",
    certificationId: "seed-세무사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-02-03"), applicationEndAt: d("2026-02-14"),
    examDateWritten: d("2026-04-04"), resultAnnouncementAt: d("2026-05-08"),
    examFee: 40000,
    subjects: "재정학, 세법학개론, 회계학개론, 상법·민법·행정소송법",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-세무사-2026-2",
    certificationId: "seed-세무사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-04-27"), applicationEndAt: d("2026-05-08"),
    examDatePractical: d("2026-05-16"), resultAnnouncementAt: d("2026-08-28"),
    examFee: 50000,
    subjects: "세법학 1·2부, 회계학 1·2부",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 공인회계사 (CPA) ═════════════════════════════════════════
  {
    id: "session-cpa-2026-1",
    certificationId: "seed-공인회계사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-19"), applicationEndAt: d("2026-01-30"),
    examDateWritten: d("2026-02-21"), resultAnnouncementAt: d("2026-03-13"),
    examFee: 30000,
    subjects: "경영학, 경제원론, 상법, 세법개론, 회계학",
    announcementUrl: "https://www.fss.or.kr", applicationUrl: "https://www.fss.or.kr", source: "금융감독원",
  },
  {
    id: "session-cpa-2026-2",
    certificationId: "seed-공인회계사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-04-27"), applicationEndAt: d("2026-05-08"),
    examDateWritten: d("2026-06-27"), resultAnnouncementAt: d("2026-09-11"),
    examFee: 50000,
    subjects: "세무회계, 재무관리, 원가관리회계, 회계감사, 재무회계",
    announcementUrl: "https://www.fss.or.kr", applicationUrl: "https://www.fss.or.kr", source: "금융감독원",
  },

  // ═══ 감정평가사 ══════════════════════════════════════════════
  {
    id: "session-감정평가사-2026-1",
    certificationId: "seed-감정평가사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-06"), applicationEndAt: d("2026-01-16"),
    examDateWritten: d("2026-03-21"), resultAnnouncementAt: d("2026-04-25"),
    examFee: 40000,
    subjects: "민법, 경제학원론, 부동산학원론, 감정평가관계법규, 회계학",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-감정평가사-2026-2",
    certificationId: "seed-감정평가사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-04"), applicationEndAt: d("2026-05-15"),
    examDatePractical: d("2026-06-28"), resultAnnouncementAt: d("2026-08-28"),
    examFee: 50000,
    subjects: "감정평가실무, 감정평가이론, 감정평가 및 보상법규",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 관세사 ══════════════════════════════════════════════════
  {
    id: "session-관세사-2026-1",
    certificationId: "seed-관세사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-20"), applicationEndAt: d("2026-01-30"),
    examDateWritten: d("2026-03-21"), resultAnnouncementAt: d("2026-04-23"),
    examFee: 40000,
    subjects: "관세법개론, 무역영어, 내국소비세법, 회계학",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },
  {
    id: "session-관세사-2026-2",
    certificationId: "seed-관세사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-05-11"), applicationEndAt: d("2026-05-22"),
    examDatePractical: d("2026-07-05"), resultAnnouncementAt: d("2026-08-29"),
    examFee: 50000,
    subjects: "관세법, 관세율표 및 상품학, 관세평가, 무역실무",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 물류관리사 ══════════════════════════════════════════════
  {
    id: "session-물류관리사-2026-1",
    certificationId: "seed-물류관리사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"),
    examDateWritten: d("2026-07-05"), resultAnnouncementAt: d("2026-08-01"),
    examFee: 21000,
    subjects: "물류관리론, 화물운송론, 국제물류론, 창고관리론, 물류관련법규",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 사회복지사 1급 (제25회 - 2027년 1월 시험) ═══════════════
  {
    id: "session-사회복지사-2026-25",
    certificationId: "seed-사회복지사 1급",
    sessionYear: 2026, sessionRound: 25,
    applicationStartAt: d("2026-09-29"), applicationEndAt: d("2026-10-10"),
    examDateWritten: d("2027-01-17"), resultAnnouncementAt: d("2027-02-12"),
    examFee: 57000,
    subjects: "사회복지기초, 사회복지실천, 사회복지정책과 제도",
    announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net",
  },

  // ═══ 변리사 ══════════════════════════════════════════════════
  {
    id: "session-변리사-2026-1",
    certificationId: "seed-변리사",
    sessionYear: 2026, sessionRound: 1,
    applicationStartAt: d("2026-01-06"), applicationEndAt: d("2026-01-23"),
    examDateWritten: d("2026-02-22"), resultAnnouncementAt: d("2026-03-31"),
    examFee: 53000,
    subjects: "산업재산권법, 민법개론, 자연과학개론",
    announcementUrl: "https://www.kipo.go.kr", applicationUrl: "https://www.kipo.go.kr", source: "특허청",
  },
  {
    id: "session-변리사-2026-2",
    certificationId: "seed-변리사",
    sessionYear: 2026, sessionRound: 2,
    applicationStartAt: d("2026-04-13"), applicationEndAt: d("2026-04-24"),
    examDatePractical: d("2026-06-21"), resultAnnouncementAt: d("2026-08-28"),
    examFee: 75000,
    subjects: "특허법, 상표법, 디자인보호법, 조약, 대리인의 실무(선택)",
    announcementUrl: "https://www.kipo.go.kr", applicationUrl: "https://www.kipo.go.kr", source: "특허청",
  },

  // ═══ Q-Net 기사/산업기사 (공통 접수일, 종목별 시험일) ══════════

  // 정보처리산업기사 (정보처리기사와 동일 일정)
  ...["정보처리산업기사"].flatMap((name) => [
    { id: `session-${name}-2026-1`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-15"), examDatePractical: d("2026-04-19"), resultAnnouncementAt: d("2026-06-06"), examFee: 19400, subjects: "정보처리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-2`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"), examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-19"), examFee: 19400, subjects: "정보처리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-3`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"), examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-01"), resultAnnouncementAt: d("2026-12-12"), examFee: 19400, subjects: "정보처리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  ]),

  // 전기산업기사 (전기기사와 동일 일정)
  ...["전기산업기사"].flatMap((name) => [
    { id: `session-${name}-2026-1`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-12"), resultAnnouncementAt: d("2026-06-13"), examFee: 19400, subjects: "전기이론, 전기기기, 전기설비", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-2`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-06-09"), applicationEndAt: d("2026-06-18"), examDateWritten: d("2026-07-05"), examDatePractical: d("2026-08-30"), resultAnnouncementAt: d("2026-09-20"), examFee: 19400, subjects: "전기이론, 전기기기, 전기설비", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-3`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-10-12"), applicationEndAt: d("2026-10-21"), examDateWritten: d("2026-11-14"), examDatePractical: d("2026-12-27"), resultAnnouncementAt: d("2027-02-14"), examFee: 19400, subjects: "전기이론, 전기기기, 전기설비", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  ]),

  // 건축기사·토목기사·일반기계기사·건설기계설비기사·조경기사·건축설비기사·측량및지형공간정보기사·금속재료기사
  ...["건축기사", "토목기사", "일반기계기사", "건설기계설비기사", "조경기사", "건축설비기사", "측량 및 지형공간정보기사", "금속재료기사", "용접기사", "가스기사", "전자기사"].flatMap((name) => [
    { id: `session-${name}-2026-1`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-15"), examDatePractical: d("2026-04-19"), resultAnnouncementAt: d("2026-06-06"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-2`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"), examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-19"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-3`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"), examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"), resultAnnouncementAt: d("2026-12-12"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  ]),

  // 대기환경기사·수질환경기사·폐기물처리기사·식품기사 (환경/식품)
  ...["대기환경기사", "수질환경기사", "폐기물처리기사", "식품기사"].flatMap((name) => [
    { id: `session-${name}-2026-1`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-12"), resultAnnouncementAt: d("2026-06-13"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-2`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"), examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-20"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-3`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"), examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-01"), resultAnnouncementAt: d("2026-12-12"), examFee: 19400, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  ]),

  // 소방설비기사(기계)
  { id: "session-소방설비기사기계-2026-1", certificationId: "seed-소방설비기사(기계)", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-14"), examDatePractical: d("2026-04-26"), resultAnnouncementAt: d("2026-06-13"), examFee: 19400, subjects: "소방원론, 소방유체역학, 소방관계법규, 소방기계시설의 구조 및 원리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-소방설비기사기계-2026-2", certificationId: "seed-소방설비기사(기계)", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"), examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-20"), examFee: 19400, subjects: "소방원론, 소방유체역학, 소방관계법규, 소방기계시설의 구조 및 원리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-소방설비기사기계-2026-3", certificationId: "seed-소방설비기사(기계)", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"), examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"), resultAnnouncementAt: d("2026-12-12"), examFee: 19400, subjects: "소방원론, 소방유체역학, 소방관계법규, 소방기계시설의 구조 및 원리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // ═══ Q-Net 기능사 (연 4회) ════════════════════════════════════
  ...["전기기능사", "한식조리기능사", "양식조리기능사", "중식조리기능사", "일식조리기능사", "조주기능사", "제과기능사", "제빵기능사"].flatMap((name) => [
    { id: `session-${name}-2026-1`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-01-24"), examDatePractical: d("2026-03-15"), resultAnnouncementAt: d("2026-04-24"), examFee: 14500, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-2`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-03-17"), applicationEndAt: d("2026-03-20"), examDateWritten: d("2026-03-29"), examDatePractical: d("2026-05-17"), resultAnnouncementAt: d("2026-06-26"), examFee: 14500, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-3`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-06-09"), applicationEndAt: d("2026-06-12"), examDateWritten: d("2026-06-22"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-19"), examFee: 14500, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
    { id: `session-${name}-2026-4`, certificationId: `seed-${name}`, sessionYear: 2026, sessionRound: 4, applicationStartAt: d("2026-08-25"), applicationEndAt: d("2026-08-28"), examDateWritten: d("2026-09-07"), examDatePractical: d("2026-10-25"), resultAnnouncementAt: d("2026-12-05"), examFee: 14500, subjects: name, announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  ]),

  // ═══ Q-Net 기타 전문자격 ══════════════════════════════════════

  // 공인노무사 (연 1회)
  { id: "session-공인노무사-2026-1", certificationId: "seed-공인노무사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-03"), applicationEndAt: d("2026-02-28"), examDateWritten: d("2026-05-09"), examDatePractical: d("2026-07-04"), resultAnnouncementAt: d("2026-11-14"), examFee: 40000, subjects: "노동법, 민법, 사회보험법, 경영·노무관리, 행정쟁송법", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 법무사 (연 1회)
  { id: "session-법무사-2026-1", certificationId: "seed-법무사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-06"), applicationEndAt: d("2026-02-28"), examDateWritten: d("2026-04-11"), examDatePractical: d("2026-06-27"), resultAnnouncementAt: d("2026-10-09"), examFee: 33000, subjects: "민법, 민사소송법, 상법, 헌법, 부동산등기법 등", announcementUrl: "https://www.moj.go.kr", applicationUrl: "https://www.moj.go.kr", source: "법무부" },

  // 행정사 (연 1회)
  { id: "session-행정사-2026-1", certificationId: "seed-행정사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-30"), applicationEndAt: d("2026-04-03"), examDateWritten: d("2026-06-06"), resultAnnouncementAt: d("2026-07-17"), examFee: 22000, subjects: "민법, 행정법, 행정학개론", announcementUrl: "https://www.mois.go.kr", applicationUrl: "https://www.mois.go.kr", source: "행정안전부" },

  // 주택관리사보 (연 1회)
  { id: "session-주택관리사보-2026-1", certificationId: "seed-주택관리사보", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-27"), applicationEndAt: d("2026-05-08"), examDateWritten: d("2026-08-16"), resultAnnouncementAt: d("2026-11-13"), examFee: 25000, subjects: "민법, 회계원리, 공동주택시설개론, 주택관리관계법규, 공동주택관리실무", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 경비지도사 (연 1회)
  { id: "session-경비지도사-2026-1", certificationId: "seed-경비지도사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-06-09"), applicationEndAt: d("2026-06-20"), examDateWritten: d("2026-07-11"), resultAnnouncementAt: d("2026-08-15"), examFee: 20000, subjects: "경비업법, 청원경찰법, 범죄학, 경호학", announcementUrl: "https://www.police.go.kr", applicationUrl: "https://www.police.go.kr", source: "경찰청" },

  // 소방시설관리사 (연 1회)
  { id: "session-소방시설관리사-2026-1", certificationId: "seed-소방시설관리사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-07"), applicationEndAt: d("2026-04-18"), examDateWritten: d("2026-05-30"), examDatePractical: d("2026-07-12"), resultAnnouncementAt: d("2026-08-14"), examFee: 33000, subjects: "소방안전관리론, 소방수리학, 약제화학 및 소방전기, 소방시설의 구조원리", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 청소년상담사 3급 (연 1회)
  { id: "session-청소년상담사-2026-1", certificationId: "seed-청소년상담사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-30"), applicationEndAt: d("2026-04-03"), examDateWritten: d("2026-05-09"), examDatePractical: d("2026-09-06"), resultAnnouncementAt: d("2026-10-24"), examFee: 18000, subjects: "발달심리, 집단상담의 기초, 심리측정 및 평가, 상담이론과 실제, 학업·진로상담", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 직업상담사 2급 (연 2회)
  { id: "session-직업상담사2급-2026-1", certificationId: "seed-직업상담사 2급", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-14"), examDatePractical: d("2026-05-09"), resultAnnouncementAt: d("2026-06-20"), examFee: 19400, subjects: "직업상담학, 직업심리학, 직업정보론, 노동시장론, 고용노동관계법", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-직업상담사2급-2026-2", certificationId: "seed-직업상담사 2급", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-07-10"), examDateWritten: d("2026-08-08"), examDatePractical: d("2026-10-04"), resultAnnouncementAt: d("2026-11-07"), examFee: 19400, subjects: "직업상담학, 직업심리학, 직업정보론, 노동시장론, 고용노동관계법", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 직업상담사 1급 (연 1회)
  { id: "session-직업상담사1급-2026-1", certificationId: "seed-직업상담사 1급", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-14"), examDatePractical: d("2026-05-09"), resultAnnouncementAt: d("2026-06-20"), examFee: 19400, subjects: "직업상담학, 직업심리학, 직업정보론, 노동시장론, 고용노동관계법, 직업상담 실무", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 사회조사분석사 2급 (연 2회)
  { id: "session-사회조사분석사-2026-1", certificationId: "seed-사회조사분석사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-14"), examDatePractical: d("2026-05-09"), resultAnnouncementAt: d("2026-06-20"), examFee: 19400, subjects: "조사방법론 1·2, 사회통계", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-사회조사분석사-2026-2", certificationId: "seed-사회조사분석사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-07-10"), examDateWritten: d("2026-08-08"), examDatePractical: d("2026-10-04"), resultAnnouncementAt: d("2026-11-07"), examFee: 19400, subjects: "조사방법론 1·2, 사회통계", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 텔레마케팅관리사 (연 2회)
  { id: "session-텔레마케팅관리사-2026-1", certificationId: "seed-텔레마케팅관리사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-14"), examDatePractical: d("2026-05-09"), resultAnnouncementAt: d("2026-06-20"), examFee: 19400, subjects: "텔레마케팅관리, 사무영어, 컴퓨터활용", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-텔레마케팅관리사-2026-2", certificationId: "seed-텔레마케팅관리사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-07-10"), examDateWritten: d("2026-08-08"), examDatePractical: d("2026-10-04"), resultAnnouncementAt: d("2026-11-07"), examFee: 19400, subjects: "텔레마케팅관리, 사무영어, 컴퓨터활용", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // 컨벤션기획사 2급 (연 1회)
  { id: "session-컨벤션기획사-2026-1", certificationId: "seed-컨벤션기획사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-07"), applicationEndAt: d("2026-04-11"), examDateWritten: d("2026-05-09"), examDatePractical: d("2026-07-12"), resultAnnouncementAt: d("2026-08-14"), examFee: 19400, subjects: "컨벤션산업론, 호텔관광실무론, 컨벤션영어", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // ═══ 대한상공회의소 (CCI) ════════════════════════════════════

  // 워드프로세서 (정기검정, 연 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-워드프로세서-2026-${round}`,
    certificationId: "seed-워드프로세서",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-14", "2026-07-14", "2026-10-13"][round - 1]),
    applicationEndAt: d(["2026-01-23", "2026-04-30", "2026-07-30", "2026-10-29"][round - 1]),
    examDateWritten: d(["2026-01-25", "2026-05-03", "2026-08-02", "2026-11-01"][round - 1]),
    examDatePractical: d(["2026-02-15", "2026-05-24", "2026-08-23", "2026-11-22"][round - 1]),
    resultAnnouncementAt: d(["2026-03-06", "2026-06-19", "2026-09-11", "2026-12-18"][round - 1]),
    examFee: 17000, subjects: "워드프로세서 실기",
    announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소",
  })),

  // 무역영어 1급 (연 3회)
  { id: "session-무역영어-2026-1", certificationId: "seed-무역영어", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-23"), examDateWritten: d("2026-02-22"), resultAnnouncementAt: d("2026-03-20"), examFee: 22000, subjects: "무역영어 필기·실기", announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소" },
  { id: "session-무역영어-2026-2", certificationId: "seed-무역영어", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-28"), examDateWritten: d("2026-06-28"), resultAnnouncementAt: d("2026-07-24"), examFee: 22000, subjects: "무역영어 필기·실기", announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소" },
  { id: "session-무역영어-2026-3", certificationId: "seed-무역영어", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-09-08"), applicationEndAt: d("2026-09-24"), examDateWritten: d("2026-10-25"), resultAnnouncementAt: d("2026-11-20"), examFee: 22000, subjects: "무역영어 필기·실기", announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소" },

  // 비서 1급 (연 2회)
  { id: "session-비서-2026-1", certificationId: "seed-비서", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-23"), examDateWritten: d("2026-02-22"), examDatePractical: d("2026-04-05"), resultAnnouncementAt: d("2026-04-24"), examFee: 22000, subjects: "비서실무, 사무영어, 사무정보관리", announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소" },
  { id: "session-비서-2026-2", certificationId: "seed-비서", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-01"), applicationEndAt: d("2026-07-17"), examDateWritten: d("2026-08-16"), examDatePractical: d("2026-09-27"), resultAnnouncementAt: d("2026-10-16"), examFee: 22000, subjects: "비서실무, 사무영어, 사무정보관리", announcementUrl: "https://license.korcham.net", applicationUrl: "https://license.korcham.net", source: "대한상공회의소" },

  // ═══ 한국세무사회 (KTAX) ══════════════════════════════════════
  // 전산회계 1·2급 / 전산세무 1·2급 (연 6회)
  ...["전산회계 1급", "전산회계 2급", "전산세무 1급", "전산세무 2급"].flatMap((name) =>
    [
      { round: 1, appStart: "2026-01-07", appEnd: "2026-01-16", exam: "2026-01-25", result: "2026-02-14" },
      { round: 2, appStart: "2026-03-10", appEnd: "2026-03-19", exam: "2026-03-29", result: "2026-04-18" },
      { round: 3, appStart: "2026-05-12", appEnd: "2026-05-21", exam: "2026-06-01", result: "2026-06-20" },
      { round: 4, appStart: "2026-07-14", appEnd: "2026-07-23", exam: "2026-08-02", result: "2026-08-22" },
      { round: 5, appStart: "2026-09-08", appEnd: "2026-09-17", exam: "2026-09-27", result: "2026-10-17" },
      { round: 6, appStart: "2026-11-10", appEnd: "2026-11-19", exam: "2026-11-29", result: "2026-12-19" },
    ].map((s) => ({
      id: `session-${name}-2026-${s.round}`,
      certificationId: `seed-${name}`,
      sessionYear: 2026, sessionRound: s.round,
      applicationStartAt: d(s.appStart), applicationEndAt: d(s.appEnd),
      examDateWritten: d(s.exam), resultAnnouncementAt: d(s.result),
      examFee: 30000, subjects: name,
      announcementUrl: "https://www.kacpta.or.kr", applicationUrl: "https://www.kacpta.or.kr", source: "한국세무사회",
    }))
  ),

  // ═══ 한국공인회계사회 (KICPA) ═══════════════════════════════
  // FAT·TAT (연 6회, 전산회계/세무와 같은 일정)
  ...["FAT", "TAT"].flatMap((name) =>
    [
      { round: 1, appStart: "2026-01-07", appEnd: "2026-01-16", exam: "2026-01-25", result: "2026-02-14" },
      { round: 2, appStart: "2026-03-10", appEnd: "2026-03-19", exam: "2026-03-29", result: "2026-04-18" },
      { round: 3, appStart: "2026-05-12", appEnd: "2026-05-21", exam: "2026-06-01", result: "2026-06-20" },
      { round: 4, appStart: "2026-07-14", appEnd: "2026-07-23", exam: "2026-08-02", result: "2026-08-22" },
      { round: 5, appStart: "2026-09-08", appEnd: "2026-09-17", exam: "2026-09-27", result: "2026-10-17" },
      { round: 6, appStart: "2026-11-10", appEnd: "2026-11-19", exam: "2026-11-29", result: "2026-12-19" },
    ].map((s) => ({
      id: `session-${name}-2026-${s.round}`,
      certificationId: `seed-${name}`,
      sessionYear: 2026, sessionRound: s.round,
      applicationStartAt: d(s.appStart), applicationEndAt: d(s.appEnd),
      examDateWritten: d(s.exam), resultAnnouncementAt: d(s.result),
      examFee: 30000, subjects: name,
      announcementUrl: "https://www.kicpa.or.kr", applicationUrl: "https://www.kicpa.or.kr", source: "한국공인회계사회",
    }))
  ),

  // ═══ 한국데이터산업진흥원 (DATAQ) — SQLP ════════════════════
  { id: "session-sqlp-2026-1", certificationId: "seed-SQLP", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-10"), applicationEndAt: d("2026-02-21"), examDateWritten: d("2026-03-21"), resultAnnouncementAt: d("2026-05-09"), examFee: 100000, subjects: "SQL 고급 활용 및 튜닝", announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원" },
  { id: "session-sqlp-2026-2", certificationId: "seed-SQLP", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-08-10"), applicationEndAt: d("2026-08-21"), examDateWritten: d("2026-09-13"), resultAnnouncementAt: d("2026-10-31"), examFee: 100000, subjects: "SQL 고급 활용 및 튜닝", announcementUrl: "https://www.dataq.or.kr", applicationUrl: "https://www.dataq.or.kr", source: "한국데이터산업진흥원" },

  // ═══ 한국생산성본부 (KPC) ══════════════════════════════════════
  // ITQ (연 12회 중 분기 대표 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-ITQ-2026-${round}`,
    certificationId: "seed-ITQ",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-23", "2026-04-24", "2026-07-24", "2026-10-23"][round - 1]),
    examDateWritten: d(["2026-01-24", "2026-04-25", "2026-07-25", "2026-10-24"][round - 1]),
    resultAnnouncementAt: d(["2026-02-13", "2026-05-15", "2026-08-14", "2026-11-13"][round - 1]),
    examFee: 22000, subjects: "아래한글, MS워드, 엑셀, 파워포인트, 액세스, 인터넷 중 선택",
    announcementUrl: "https://www.itq.or.kr", applicationUrl: "https://www.itq.or.kr", source: "한국생산성본부",
  })),

  // GTQ (연 4회)
  { id: "session-GTQ-2026-1", certificationId: "seed-GTQ", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-27"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-02-14"), resultAnnouncementAt: d("2026-02-28"), examFee: 22000, subjects: "포토샵, 일러스트레이터", announcementUrl: "https://www.gtq.or.kr", applicationUrl: "https://www.gtq.or.kr", source: "한국생산성본부" },
  { id: "session-GTQ-2026-2", certificationId: "seed-GTQ", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-04-28"), applicationEndAt: d("2026-05-09"), examDateWritten: d("2026-05-17"), resultAnnouncementAt: d("2026-05-31"), examFee: 22000, subjects: "포토샵, 일러스트레이터", announcementUrl: "https://www.gtq.or.kr", applicationUrl: "https://www.gtq.or.kr", source: "한국생산성본부" },
  { id: "session-GTQ-2026-3", certificationId: "seed-GTQ", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-07-28"), applicationEndAt: d("2026-08-08"), examDateWritten: d("2026-08-16"), resultAnnouncementAt: d("2026-08-30"), examFee: 22000, subjects: "포토샵, 일러스트레이터", announcementUrl: "https://www.gtq.or.kr", applicationUrl: "https://www.gtq.or.kr", source: "한국생산성본부" },
  { id: "session-GTQ-2026-4", certificationId: "seed-GTQ", sessionYear: 2026, sessionRound: 4, applicationStartAt: d("2026-10-27"), applicationEndAt: d("2026-11-07"), examDateWritten: d("2026-11-15"), resultAnnouncementAt: d("2026-11-29"), examFee: 22000, subjects: "포토샵, 일러스트레이터", announcementUrl: "https://www.gtq.or.kr", applicationUrl: "https://www.gtq.or.kr", source: "한국생산성본부" },

  // ERP정보관리사 (연 4회)
  { id: "session-ERP정보관리사-2026-1", certificationId: "seed-ERP정보관리사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-27"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-02-22"), resultAnnouncementAt: d("2026-03-13"), examFee: 44000, subjects: "회계·인사·물류·생산 중 선택", announcementUrl: "https://www.kpc.or.kr", applicationUrl: "https://www.kpc.or.kr", source: "한국생산성본부" },
  { id: "session-ERP정보관리사-2026-2", certificationId: "seed-ERP정보관리사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-04-28"), applicationEndAt: d("2026-05-09"), examDateWritten: d("2026-05-24"), resultAnnouncementAt: d("2026-06-12"), examFee: 44000, subjects: "회계·인사·물류·생산 중 선택", announcementUrl: "https://www.kpc.or.kr", applicationUrl: "https://www.kpc.or.kr", source: "한국생산성본부" },
  { id: "session-ERP정보관리사-2026-3", certificationId: "seed-ERP정보관리사", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-07-28"), applicationEndAt: d("2026-08-08"), examDateWritten: d("2026-08-23"), resultAnnouncementAt: d("2026-09-11"), examFee: 44000, subjects: "회계·인사·물류·생산 중 선택", announcementUrl: "https://www.kpc.or.kr", applicationUrl: "https://www.kpc.or.kr", source: "한국생산성본부" },
  { id: "session-ERP정보관리사-2026-4", certificationId: "seed-ERP정보관리사", sessionYear: 2026, sessionRound: 4, applicationStartAt: d("2026-10-27"), applicationEndAt: d("2026-11-07"), examDateWritten: d("2026-11-22"), resultAnnouncementAt: d("2026-12-11"), examFee: 44000, subjects: "회계·인사·물류·생산 중 선택", announcementUrl: "https://www.kpc.or.kr", applicationUrl: "https://www.kpc.or.kr", source: "한국생산성본부" },

  // ═══ 한국정보통신진흥협회 (KAIT) ═════════════════════════════
  // 리눅스마스터 1급 (연 2회)
  { id: "session-리눅스마스터-2026-1", certificationId: "seed-리눅스마스터", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-01"), resultAnnouncementAt: d("2026-04-10"), examFee: 69300, subjects: "리눅스 시스템 이해, 리눅스 활용, 네트워크 및 서버 환경", announcementUrl: "https://www.ihd.or.kr", applicationUrl: "https://www.ihd.or.kr", source: "한국정보통신진흥협회" },
  { id: "session-리눅스마스터-2026-2", certificationId: "seed-리눅스마스터", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-14"), applicationEndAt: d("2026-08-08"), examDateWritten: d("2026-09-06"), resultAnnouncementAt: d("2026-10-10"), examFee: 69300, subjects: "리눅스 시스템 이해, 리눅스 활용, 네트워크 및 서버 환경", announcementUrl: "https://www.ihd.or.kr", applicationUrl: "https://www.ihd.or.kr", source: "한국정보통신진흥협회" },

  // 정보보안전문가(SIS) (연 2회)
  { id: "session-정보보안전문가-2026-1", certificationId: "seed-정보보안전문가", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-21"), examDateWritten: d("2026-03-28"), resultAnnouncementAt: d("2026-05-02"), examFee: 80000, subjects: "보안 기초, 네트워크 보안, 시스템 보안, 암호학 및 응용보안", announcementUrl: "https://www.ihd.or.kr", applicationUrl: "https://www.ihd.or.kr", source: "한국정보통신진흥협회" },
  { id: "session-정보보안전문가-2026-2", certificationId: "seed-정보보안전문가", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-08-10"), applicationEndAt: d("2026-08-28"), examDateWritten: d("2026-09-26"), resultAnnouncementAt: d("2026-10-31"), examFee: 80000, subjects: "보안 기초, 네트워크 보안, 시스템 보안, 암호학 및 응용보안", announcementUrl: "https://www.ihd.or.kr", applicationUrl: "https://www.ihd.or.kr", source: "한국정보통신진흥협회" },

  // ═══ 한국금융연수원 (KBII) ═══════════════════════════════════
  // 신용분석사 (연 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-신용분석사-2026-${round}`,
    certificationId: "seed-신용분석사",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-09", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-16", "2026-04-14", "2026-07-14", "2026-10-13"][round - 1]),
    examDateWritten: d(["2026-02-14", "2026-05-09", "2026-08-08", "2026-11-07"][round - 1]),
    resultAnnouncementAt: d(["2026-03-07", "2026-06-06", "2026-09-05", "2026-12-05"][round - 1]),
    examFee: 40000, subjects: "재무분석, 신용위험분석, 기업가치평가",
    announcementUrl: "https://www.kbi.or.kr", applicationUrl: "https://www.kbi.or.kr", source: "한국금융연수원",
  })),

  // 자산관리사(FP) (연 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-자산관리사FP-2026-${round}`,
    certificationId: "seed-자산관리사(FP)",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-09", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-16", "2026-04-14", "2026-07-14", "2026-10-13"][round - 1]),
    examDateWritten: d(["2026-02-14", "2026-05-09", "2026-08-08", "2026-11-07"][round - 1]),
    resultAnnouncementAt: d(["2026-03-07", "2026-06-06", "2026-09-05", "2026-12-05"][round - 1]),
    examFee: 30000, subjects: "금융자산관리 기초, 세금과 대출, 부동산 및 보험, 투자자산운용",
    announcementUrl: "https://www.kbi.or.kr", applicationUrl: "https://www.kbi.or.kr", source: "한국금융연수원",
  })),

  // ═══ 금융투자협회 (KFIA) ══════════════════════════════════════
  // 투자자산운용사·펀드·파생상품·증권 투자권유자문인력 (연 4회)
  ...["투자자산운용사", "펀드투자권유자문인력", "파생상품투자권유자문인력", "증권투자권유자문인력"].flatMap((name) =>
    ([1, 2, 3, 4] as const).map((round) => ({
      id: `session-${name}-2026-${round}`,
      certificationId: `seed-${name}`,
      sessionYear: 2026, sessionRound: round,
      applicationStartAt: d(["2026-01-13", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
      applicationEndAt: d(["2026-01-24", "2026-04-18", "2026-07-18", "2026-10-17"][round - 1]),
      examDateWritten: d(["2026-02-28", "2026-05-16", "2026-08-22", "2026-11-21"][round - 1]),
      resultAnnouncementAt: d(["2026-03-21", "2026-06-13", "2026-09-19", "2026-12-19"][round - 1]),
      examFee: 30000, subjects: name,
      announcementUrl: "https://www.kofia.or.kr", applicationUrl: "https://www.kofia.or.kr", source: "금융투자협회",
    }))
  ),

  // ═══ 국사편찬위원회 — 한국사 기본 (심화와 동일 날짜) ══════════
  { id: "session-한국사기본-2026-68", certificationId: "seed-한국사능력검정시험 기본", sessionYear: 2026, sessionRound: 68, applicationStartAt: d("2026-01-08"), applicationEndAt: d("2026-01-21"), examDateWritten: d("2026-02-07"), resultAnnouncementAt: d("2026-02-26"), examFee: 8000, subjects: "한국사 (기본: 4~6급)", announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회" },
  { id: "session-한국사기본-2026-69", certificationId: "seed-한국사능력검정시험 기본", sessionYear: 2026, sessionRound: 69, applicationStartAt: d("2026-03-30"), applicationEndAt: d("2026-04-10"), examDateWritten: d("2026-05-02"), resultAnnouncementAt: d("2026-05-22"), examFee: 8000, subjects: "한국사 (기본: 4~6급)", announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회" },
  { id: "session-한국사기본-2026-70", certificationId: "seed-한국사능력검정시험 기본", sessionYear: 2026, sessionRound: 70, applicationStartAt: d("2026-07-07"), applicationEndAt: d("2026-07-18"), examDateWritten: d("2026-08-08"), resultAnnouncementAt: d("2026-08-28"), examFee: 8000, subjects: "한국사 (기본: 4~6급)", announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회" },
  { id: "session-한국사기본-2026-71", certificationId: "seed-한국사능력검정시험 기본", sessionYear: 2026, sessionRound: 71, applicationStartAt: d("2026-09-22"), applicationEndAt: d("2026-10-02"), examDateWritten: d("2026-10-24"), resultAnnouncementAt: d("2026-11-12"), examFee: 8000, subjects: "한국사 (기본: 4~6급)", announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회" },
  { id: "session-한국사기본-2026-72", certificationId: "seed-한국사능력검정시험 기본", sessionYear: 2026, sessionRound: 72, applicationStartAt: d("2026-11-09"), applicationEndAt: d("2026-11-20"), examDateWritten: d("2026-12-12"), resultAnnouncementAt: d("2027-01-08"), examFee: 8000, subjects: "한국사 (기본: 4~6급)", announcementUrl: "https://www.historyexam.go.kr", applicationUrl: "https://www.historyexam.go.kr", source: "국사편찬위원회" },

  // ═══ 어학 시험 ════════════════════════════════════════════════
  // JLPT (연 2회: 7월, 12월)
  { id: "session-JLPT-2026-1", certificationId: "seed-JLPT", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-20"), applicationEndAt: d("2026-04-03"), examDateWritten: d("2026-07-05"), resultAnnouncementAt: d("2026-08-28"), examFee: 35000, subjects: "언어지식(문자·어휘·문법), 독해, 청해", announcementUrl: "https://www.jlpt.jp", applicationUrl: "https://www.jlpt.jp", source: "일본국제교류기금" },
  { id: "session-JLPT-2026-2", certificationId: "seed-JLPT", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-09-25"), applicationEndAt: d("2026-10-09"), examDateWritten: d("2026-12-06"), resultAnnouncementAt: d("2027-01-23"), examFee: 35000, subjects: "언어지식(문자·어휘·문법), 독해, 청해", announcementUrl: "https://www.jlpt.jp", applicationUrl: "https://www.jlpt.jp", source: "일본국제교류기금" },

  // KBS한국어능력시험 (연 4회)
  { id: "session-KBS한국어능력시험-2026-1", certificationId: "seed-KBS한국어능력시험", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-27"), applicationEndAt: d("2026-02-07"), examDateWritten: d("2026-03-01"), resultAnnouncementAt: d("2026-03-28"), examFee: 37000, subjects: "어휘·어법, 듣기, 쓰기, 읽기, 창안", announcementUrl: "https://www.kbs.co.kr/koreanlang", applicationUrl: "https://www.kbs.co.kr/koreanlang", source: "KBS" },
  { id: "session-KBS한국어능력시험-2026-2", certificationId: "seed-KBS한국어능력시험", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-25"), applicationEndAt: d("2026-06-05"), examDateWritten: d("2026-06-28"), resultAnnouncementAt: d("2026-07-25"), examFee: 37000, subjects: "어휘·어법, 듣기, 쓰기, 읽기, 창안", announcementUrl: "https://www.kbs.co.kr/koreanlang", applicationUrl: "https://www.kbs.co.kr/koreanlang", source: "KBS" },
  { id: "session-KBS한국어능력시험-2026-3", certificationId: "seed-KBS한국어능력시험", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-24"), applicationEndAt: d("2026-09-04"), examDateWritten: d("2026-09-27"), resultAnnouncementAt: d("2026-10-24"), examFee: 37000, subjects: "어휘·어법, 듣기, 쓰기, 읽기, 창안", announcementUrl: "https://www.kbs.co.kr/koreanlang", applicationUrl: "https://www.kbs.co.kr/koreanlang", source: "KBS" },
  { id: "session-KBS한국어능력시험-2026-4", certificationId: "seed-KBS한국어능력시험", sessionYear: 2026, sessionRound: 4, applicationStartAt: d("2026-11-23"), applicationEndAt: d("2026-12-04"), examDateWritten: d("2026-12-27"), resultAnnouncementAt: d("2027-01-23"), examFee: 37000, subjects: "어휘·어법, 듣기, 쓰기, 읽기, 창안", announcementUrl: "https://www.kbs.co.kr/koreanlang", applicationUrl: "https://www.kbs.co.kr/koreanlang", source: "KBS" },

  // ═══ 의료/보건 국가시험 (한국보건의료인국가시험원) ════════════
  // 의사 국가시험 (연 1회)
  { id: "session-의사-2026-1", certificationId: "seed-의사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-10-31"), examDateWritten: d("2026-01-09"), examDatePractical: d("2026-02-26"), resultAnnouncementAt: d("2026-03-19"), examFee: 120000, subjects: "의학총론, 의학각론", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 치과의사 국가시험
  { id: "session-치과의사-2026-1", certificationId: "seed-치과의사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-10-31"), examDateWritten: d("2026-01-10"), examDatePractical: d("2026-02-19"), resultAnnouncementAt: d("2026-03-19"), examFee: 90000, subjects: "치의학총론, 치의학각론", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 한의사 국가시험
  { id: "session-한의사-2026-1", certificationId: "seed-한의사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-10-31"), examDateWritten: d("2026-01-10"), resultAnnouncementAt: d("2026-02-26"), examFee: 60000, subjects: "한의학총론, 한의학각론", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 약사 국가시험
  { id: "session-약사-2026-1", certificationId: "seed-약사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-17"), resultAnnouncementAt: d("2026-02-12"), examFee: 60000, subjects: "약학총론, 약학각론", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 간호사 국가시험
  { id: "session-간호사-2026-1", certificationId: "seed-간호사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-16"), resultAnnouncementAt: d("2026-02-05"), examFee: 60000, subjects: "성인간호학, 모성간호학, 아동간호학, 지역사회간호학, 정신간호학, 간호관리학, 기본간호학", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 영양사 국가시험
  { id: "session-영양사-2026-1", certificationId: "seed-영양사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-18"), resultAnnouncementAt: d("2026-02-26"), examFee: 50000, subjects: "영양학, 생화학, 식사요법, 임상영양학, 식품학, 식품위생학, 단체급식관리", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 물리치료사 국가시험
  { id: "session-물리치료사-2026-1", certificationId: "seed-물리치료사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-18"), resultAnnouncementAt: d("2026-02-26"), examFee: 50000, subjects: "기초의학, 내과학, 의학용어, 물리치료학, 임상신경학", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 방사선사 국가시험
  { id: "session-방사선사-2026-1", certificationId: "seed-방사선사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-17"), resultAnnouncementAt: d("2026-02-26"), examFee: 50000, subjects: "방사선 물리학, 방사선 생물학, 방사선 기기학, 방사선 사진학", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 임상병리사 국가시험
  { id: "session-임상병리사-2026-1", certificationId: "seed-임상병리사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-18"), resultAnnouncementAt: d("2026-02-26"), examFee: 50000, subjects: "임상혈액학, 임상화학, 임상미생물학, 임상면역학, 조직검사학", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 위생사 국가시험
  { id: "session-위생사-2026-1", certificationId: "seed-위생사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-11-01"), applicationEndAt: d("2025-11-30"), examDateWritten: d("2026-01-24"), resultAnnouncementAt: d("2026-02-26"), examFee: 50000, subjects: "위생관계법령, 환경위생학, 위생곤충학, 공중보건학, 식품위생학", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  // 간호조무사 국가시험 (연 2회)
  { id: "session-간호조무사-2026-1", certificationId: "seed-간호조무사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-05"), applicationEndAt: d("2026-01-30"), examDateWritten: d("2026-03-14"), resultAnnouncementAt: d("2026-04-02"), examFee: 40000, subjects: "기초간호학개요, 보건간호학개요, 공중보건학개론, 실기(보건의약관계법규)", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },
  { id: "session-간호조무사-2026-2", certificationId: "seed-간호조무사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-06-01"), applicationEndAt: d("2026-06-30"), examDateWritten: d("2026-08-08"), resultAnnouncementAt: d("2026-08-27"), examFee: 40000, subjects: "기초간호학개요, 보건간호학개요, 공중보건학개론, 실기(보건의약관계법규)", announcementUrl: "https://www.kuksiwon.or.kr", applicationUrl: "https://www.kuksiwon.or.kr", source: "한국보건의료인국가시험원" },

  // ═══ 변호사 시험 (법무부) ════════════════════════════════════
  { id: "session-변호사-2026-1", certificationId: "seed-변호사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2025-10-01"), applicationEndAt: d("2025-10-31"), examDateWritten: d("2026-01-07"), resultAnnouncementAt: d("2026-04-24"), examFee: 70000, subjects: "공법, 민사법, 형사법, 선택과목(5개 중 1개)", announcementUrl: "https://www.moj.go.kr", applicationUrl: "https://www.moj.go.kr", source: "법무부" },

  // ═══ 건축사 (대한건축사협회) ════════════════════════════════
  { id: "session-건축사-2026-1", certificationId: "seed-건축사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-02"), applicationEndAt: d("2026-03-13"), examDateWritten: d("2026-04-25"), resultAnnouncementAt: d("2026-06-26"), examFee: 50000, subjects: "대지계획, 건물계획, 구조계획", announcementUrl: "https://www.architect.or.kr", applicationUrl: "https://www.architect.or.kr", source: "대한건축사협회" },
  { id: "session-건축사-2026-2", certificationId: "seed-건축사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-08-24"), applicationEndAt: d("2026-09-04"), examDateWritten: d("2026-10-10"), resultAnnouncementAt: d("2026-12-11"), examFee: 50000, subjects: "대지계획, 건물계획, 구조계획", announcementUrl: "https://www.architect.or.kr", applicationUrl: "https://www.architect.or.kr", source: "대한건축사협회" },

  // ═══ 보험 (금융감독원) ════════════════════════════════════════
  // 보험계리사 (연 1회)
  { id: "session-보험계리사-2026-1", certificationId: "seed-보험계리사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-28"), examDateWritten: d("2026-04-18"), examDatePractical: d("2026-07-04"), resultAnnouncementAt: d("2026-08-14"), examFee: 50000, subjects: "보험수학, 보험경영론, 생명보험이론, 리스크관리", announcementUrl: "https://www.fss.or.kr", applicationUrl: "https://www.fss.or.kr", source: "금융감독원" },
  // 손해사정사 (연 1회)
  { id: "session-손해사정사-2026-1", certificationId: "seed-손해사정사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-28"), examDateWritten: d("2026-04-11"), examDatePractical: d("2026-07-11"), resultAnnouncementAt: d("2026-08-14"), examFee: 40000, subjects: "보험업법, 손해사정이론, 책임보험·근재보험, 차량·화재·특종보험", announcementUrl: "https://www.fss.or.kr", applicationUrl: "https://www.fss.or.kr", source: "금융감독원" },
  // 보험중개사 (연 1회)
  { id: "session-보험중개사-2026-1", certificationId: "seed-보험중개사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-09"), applicationEndAt: d("2026-03-27"), examDateWritten: d("2026-05-02"), resultAnnouncementAt: d("2026-06-12"), examFee: 30000, subjects: "보험업법, 보험원론, 보험마케팅", announcementUrl: "https://www.insurance.or.kr", applicationUrl: "https://www.insurance.or.kr", source: "보험연수원" },

  // ═══ 한국FPSB (AFPK·CFP) ══════════════════════════════════════
  // AFPK (연 2회: 6월, 11월)
  { id: "session-AFPK-2026-1", certificationId: "seed-AFPK", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-14"), applicationEndAt: d("2026-04-25"), examDateWritten: d("2026-06-06"), resultAnnouncementAt: d("2026-07-03"), examFee: 80000, subjects: "재무설계원론, 은퇴·세금·부동산·위험관리설계", announcementUrl: "https://www.fpkorea.com", applicationUrl: "https://www.fpkorea.com", source: "한국FPSB" },
  { id: "session-AFPK-2026-2", certificationId: "seed-AFPK", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-09-14"), applicationEndAt: d("2026-09-25"), examDateWritten: d("2026-11-07"), resultAnnouncementAt: d("2026-12-04"), examFee: 80000, subjects: "재무설계원론, 은퇴·세금·부동산·위험관리설계", announcementUrl: "https://www.fpkorea.com", applicationUrl: "https://www.fpkorea.com", source: "한국FPSB" },
  // CFP (연 1회: 6월)
  { id: "session-CFP-2026-1", certificationId: "seed-CFP", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-14"), applicationEndAt: d("2026-04-25"), examDateWritten: d("2026-06-20"), resultAnnouncementAt: d("2026-07-31"), examFee: 120000, subjects: "재무설계, 투자설계, 은퇴설계, 세금설계, 부동산설계, 위험관리", announcementUrl: "https://www.fpkorea.com", applicationUrl: "https://www.fpkorea.com", source: "한국FPSB" },

  // ═══ 어학 추가 시험 ═══════════════════════════════════════════
  // TOEIC (대표 분기 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-TOEIC-2026-${round}`,
    certificationId: "seed-TOEIC",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-16", "2026-04-16", "2026-07-16", "2026-10-15"][round - 1]),
    examDateWritten: d(["2026-01-25", "2026-04-26", "2026-07-26", "2026-10-25"][round - 1]),
    resultAnnouncementAt: d(["2026-02-13", "2026-05-15", "2026-08-14", "2026-11-13"][round - 1]),
    examFee: 52500, subjects: "LC(청취), RC(독해)",
    announcementUrl: "https://www.toeic.co.kr", applicationUrl: "https://www.toeic.co.kr", source: "YBM",
  })),

  // OPIc (대표 분기 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-OPIc-2026-${round}`,
    certificationId: "seed-OPIc",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-16", "2026-04-16", "2026-07-16", "2026-10-15"][round - 1]),
    examDateWritten: d(["2026-01-24", "2026-04-25", "2026-07-25", "2026-10-24"][round - 1]),
    resultAnnouncementAt: d(["2026-01-28", "2026-04-29", "2026-07-29", "2026-10-28"][round - 1]),
    examFee: 78100, subjects: "영어 말하기",
    announcementUrl: "https://www.opic.or.kr", applicationUrl: "https://www.opic.or.kr", source: "ACTFL",
  })),

  // HSK (연 4회 대표)
  { id: "session-HSK-2026-1", certificationId: "seed-HSK", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-30"), examDateWritten: d("2026-03-15"), resultAnnouncementAt: d("2026-04-15"), examFee: 50000, subjects: "듣기, 독해, 쓰기", announcementUrl: "https://www.hsk.or.kr", applicationUrl: "https://www.hsk.or.kr", source: "한국HSK사무국" },
  { id: "session-HSK-2026-2", certificationId: "seed-HSK", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-04-01"), applicationEndAt: d("2026-04-30"), examDateWritten: d("2026-05-24"), resultAnnouncementAt: d("2026-06-24"), examFee: 50000, subjects: "듣기, 독해, 쓰기", announcementUrl: "https://www.hsk.or.kr", applicationUrl: "https://www.hsk.or.kr", source: "한국HSK사무국" },
  { id: "session-HSK-2026-3", certificationId: "seed-HSK", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-07-01"), applicationEndAt: d("2026-07-31"), examDateWritten: d("2026-08-23"), resultAnnouncementAt: d("2026-09-23"), examFee: 50000, subjects: "듣기, 독해, 쓰기", announcementUrl: "https://www.hsk.or.kr", applicationUrl: "https://www.hsk.or.kr", source: "한국HSK사무국" },
  { id: "session-HSK-2026-4", certificationId: "seed-HSK", sessionYear: 2026, sessionRound: 4, applicationStartAt: d("2026-10-01"), applicationEndAt: d("2026-10-31"), examDateWritten: d("2026-11-22"), resultAnnouncementAt: d("2026-12-22"), examFee: 50000, subjects: "듣기, 독해, 쓰기", announcementUrl: "https://www.hsk.or.kr", applicationUrl: "https://www.hsk.or.kr", source: "한국HSK사무국" },

  // TEPS (분기 3회)
  { id: "session-TEPS-2026-1", certificationId: "seed-TEPS", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-07"), applicationEndAt: d("2026-01-30"), examDateWritten: d("2026-02-14"), resultAnnouncementAt: d("2026-02-20"), examFee: 42000, subjects: "청해, 어휘, 문법, 독해", announcementUrl: "https://www.teps.or.kr", applicationUrl: "https://www.teps.or.kr", source: "서울대학교 TEPS관리위원회" },
  { id: "session-TEPS-2026-2", certificationId: "seed-TEPS", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-01"), applicationEndAt: d("2026-05-31"), examDateWritten: d("2026-06-20"), resultAnnouncementAt: d("2026-06-26"), examFee: 42000, subjects: "청해, 어휘, 문법, 독해", announcementUrl: "https://www.teps.or.kr", applicationUrl: "https://www.teps.or.kr", source: "서울대학교 TEPS관리위원회" },
  { id: "session-TEPS-2026-3", certificationId: "seed-TEPS", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-10-01"), applicationEndAt: d("2026-10-31"), examDateWritten: d("2026-11-21"), resultAnnouncementAt: d("2026-11-27"), examFee: 42000, subjects: "청해, 어휘, 문법, 독해", announcementUrl: "https://www.teps.or.kr", applicationUrl: "https://www.teps.or.kr", source: "서울대학교 TEPS관리위원회" },

  // TOEFL (대표 분기 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-TOEFL-2026-${round}`,
    certificationId: "seed-TOEFL",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-02-13", "2026-05-15", "2026-08-14", "2026-11-13"][round - 1]),
    examDateWritten: d(["2026-02-14", "2026-05-16", "2026-08-15", "2026-11-14"][round - 1]),
    resultAnnouncementAt: d(["2026-03-06", "2026-06-05", "2026-09-04", "2026-12-04"][round - 1]),
    examFee: 260000, subjects: "Reading, Listening, Speaking, Writing",
    announcementUrl: "https://www.ets.org/toefl", applicationUrl: "https://www.ets.org/toefl", source: "ETS",
  })),

  // MOS (대표 분기 4회)
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-MOS-2026-${round}`,
    certificationId: "seed-MOS",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-07", "2026-04-07", "2026-07-07", "2026-10-06"][round - 1]),
    applicationEndAt: d(["2026-01-23", "2026-04-24", "2026-07-24", "2026-10-23"][round - 1]),
    examDateWritten: d(["2026-01-31", "2026-05-02", "2026-08-01", "2026-10-31"][round - 1]),
    resultAnnouncementAt: d(["2026-02-07", "2026-05-09", "2026-08-08", "2026-11-07"][round - 1]),
    examFee: 50000, subjects: "Word, Excel, PowerPoint, Access, Outlook 중 선택",
    announcementUrl: "https://mos.or.kr", applicationUrl: "https://mos.or.kr", source: "영진닷컴",
  })),

  // ═══ 정보통신기사 (Q-Net, 연 3회) ════════════════════════════
  { id: "session-정보통신기사-2026-1", certificationId: "seed-정보통신기사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-13"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-02-15"), examDatePractical: d("2026-04-19"), resultAnnouncementAt: d("2026-06-06"), examFee: 19400, subjects: "정보전송공학, 무선통신공학, 전자회로, 통신관계법규", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-정보통신기사-2026-2", certificationId: "seed-정보통신기사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-05-12"), applicationEndAt: d("2026-05-21"), examDateWritten: d("2026-06-21"), examDatePractical: d("2026-08-09"), resultAnnouncementAt: d("2026-09-19"), examFee: 19400, subjects: "정보전송공학, 무선통신공학, 전자회로, 통신관계법규", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },
  { id: "session-정보통신기사-2026-3", certificationId: "seed-정보통신기사", sessionYear: 2026, sessionRound: 3, applicationStartAt: d("2026-08-18"), applicationEndAt: d("2026-08-27"), examDateWritten: d("2026-09-27"), examDatePractical: d("2026-11-08"), resultAnnouncementAt: d("2026-12-12"), examFee: 19400, subjects: "정보전송공학, 무선통신공학, 전자회로, 통신관계법규", announcementUrl: "https://www.q-net.or.kr", applicationUrl: "https://www.q-net.or.kr", source: "Q-Net" },

  // ═══ 국제무역사 (KITA, 연 2회) ═══════════════════════════════
  { id: "session-국제무역사-2026-1", certificationId: "seed-국제무역사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-04-01"), applicationEndAt: d("2026-04-30"), examDateWritten: d("2026-06-06"), resultAnnouncementAt: d("2026-07-10"), examFee: 40000, subjects: "무역실무, 무역법규, 무역영어", announcementUrl: "https://www.kita.net", applicationUrl: "https://www.kita.net", source: "한국무역협회" },
  { id: "session-국제무역사-2026-2", certificationId: "seed-국제무역사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-09-01"), applicationEndAt: d("2026-09-30"), examDateWritten: d("2026-11-07"), resultAnnouncementAt: d("2026-12-11"), examFee: 40000, subjects: "무역실무, 무역법규, 무역영어", announcementUrl: "https://www.kita.net", applicationUrl: "https://www.kita.net", source: "한국무역협회" },

  // ═══ 한자능력검정시험 (한국어문회, 연 4회) ════════════════════
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-한자능력검정-2026-${round}`,
    certificationId: "seed-한자능력검정시험",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-05", "2026-04-06", "2026-07-06", "2026-10-05"][round - 1]),
    applicationEndAt: d(["2026-01-23", "2026-04-24", "2026-07-24", "2026-10-23"][round - 1]),
    examDateWritten: d(["2026-02-07", "2026-05-09", "2026-08-08", "2026-11-07"][round - 1]),
    resultAnnouncementAt: d(["2026-03-07", "2026-06-06", "2026-09-05", "2026-12-05"][round - 1]),
    examFee: 25000, subjects: "한자 읽기·쓰기, 훈음, 반의어, 사자성어",
    announcementUrl: "https://www.hanja.re.kr", applicationUrl: "https://www.hanja.re.kr", source: "한국어문회",
  })),

  // ═══ 실용한자 (한자교육진흥회, 연 4회) ═══════════════════════
  ...([1, 2, 3, 4] as const).map((round) => ({
    id: `session-실용한자-2026-${round}`,
    certificationId: "seed-실용한자",
    sessionYear: 2026, sessionRound: round,
    applicationStartAt: d(["2026-01-05", "2026-04-06", "2026-07-06", "2026-10-05"][round - 1]),
    applicationEndAt: d(["2026-01-23", "2026-04-24", "2026-07-24", "2026-10-23"][round - 1]),
    examDateWritten: d(["2026-02-08", "2026-05-10", "2026-08-09", "2026-11-08"][round - 1]),
    resultAnnouncementAt: d(["2026-03-08", "2026-06-07", "2026-09-06", "2026-12-06"][round - 1]),
    examFee: 20000, subjects: "한자 읽기·쓰기·활용",
    announcementUrl: "https://www.hanjaedu.or.kr", applicationUrl: "https://www.hanjaedu.or.kr", source: "한자교육진흥회",
  })),

  // ═══ 한국실용글쓰기검정 (한국국어능력평가협회, 연 2회) ═══════
  { id: "session-한국실용글쓰기-2026-1", certificationId: "seed-한국실용글쓰기검정", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-02"), applicationEndAt: d("2026-04-03"), examDateWritten: d("2026-05-09"), resultAnnouncementAt: d("2026-06-05"), examFee: 33000, subjects: "실용 글쓰기 이론, 실기(작문)", announcementUrl: "https://www.wriking.or.kr", applicationUrl: "https://www.wriking.or.kr", source: "한국국어능력평가협회" },
  { id: "session-한국실용글쓰기-2026-2", certificationId: "seed-한국실용글쓰기검정", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-08-03"), applicationEndAt: d("2026-09-04"), examDateWritten: d("2026-10-10"), resultAnnouncementAt: d("2026-11-06"), examFee: 33000, subjects: "실용 글쓰기 이론, 실기(작문)", announcementUrl: "https://www.wriking.or.kr", applicationUrl: "https://www.wriking.or.kr", source: "한국국어능력평가협회" },

  // ═══ 한국어교원 (국립국어원, 연 1회) ════════════════════════
  { id: "session-한국어교원-2026-1", certificationId: "seed-한국어교원", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-06-01"), applicationEndAt: d("2026-06-30"), examDateWritten: d("2026-08-29"), resultAnnouncementAt: d("2026-10-09"), examFee: 42000, subjects: "한국어학, 일반언어학 및 응용언어학, 외국어로서의 한국어교육론, 한국문화", announcementUrl: "https://www.koreanteacher.or.kr", applicationUrl: "https://www.koreanteacher.or.kr", source: "국립국어원" },

  // ═══ 평생교육사 (국가평생교육진흥원, 연 2회) ════════════════
  { id: "session-평생교육사-2026-1", certificationId: "seed-평생교육사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-05"), applicationEndAt: d("2026-01-16"), examDateWritten: d("2026-01-31"), resultAnnouncementAt: d("2026-03-20"), examFee: 100000, subjects: "평생교육론, 평생교육방법론, 평생교육경영론, 프로그램개발론", announcementUrl: "https://lledu.nile.or.kr", applicationUrl: "https://lledu.nile.or.kr", source: "국가평생교육진흥원" },
  { id: "session-평생교육사-2026-2", certificationId: "seed-평생교육사", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-07-17"), examDateWritten: d("2026-07-31"), resultAnnouncementAt: d("2026-09-18"), examFee: 100000, subjects: "평생교육론, 평생교육방법론, 평생교육경영론, 프로그램개발론", announcementUrl: "https://lledu.nile.or.kr", applicationUrl: "https://lledu.nile.or.kr", source: "국가평생교육진흥원" },

  // ═══ 청소년지도사 (한국청소년활동진흥원, 연 1회) ════════════
  { id: "session-청소년지도사-2026-1", certificationId: "seed-청소년지도사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-02-02"), applicationEndAt: d("2026-02-13"), examDateWritten: d("2026-03-14"), examDatePractical: d("2026-06-13"), resultAnnouncementAt: d("2026-07-17"), examFee: 18000, subjects: "청소년육성제도론, 청소년지도방법론, 청소년심리 및 상담, 청소년문화, 청소년활동", announcementUrl: "https://www.youth.go.kr", applicationUrl: "https://www.youth.go.kr", source: "한국청소년활동진흥원" },

  // ═══ 브레인트레이너 (한국뇌과학연구원, 연 2회) ══════════════
  { id: "session-브레인트레이너-2026-1", certificationId: "seed-브레인트레이너", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-01-05"), applicationEndAt: d("2026-02-27"), examDateWritten: d("2026-03-28"), resultAnnouncementAt: d("2026-04-25"), examFee: 50000, subjects: "뇌교육이론, 뇌체조, 명상", announcementUrl: "https://www.braintrainer.or.kr", applicationUrl: "https://www.braintrainer.or.kr", source: "한국뇌과학연구원" },
  { id: "session-브레인트레이너-2026-2", certificationId: "seed-브레인트레이너", sessionYear: 2026, sessionRound: 2, applicationStartAt: d("2026-07-06"), applicationEndAt: d("2026-08-28"), examDateWritten: d("2026-09-26"), resultAnnouncementAt: d("2026-10-23"), examFee: 50000, subjects: "뇌교육이론, 뇌체조, 명상", announcementUrl: "https://www.braintrainer.or.kr", applicationUrl: "https://www.braintrainer.or.kr", source: "한국뇌과학연구원" },

  // ═══ 직업능력개발훈련교사 (HRD Korea, 연 1회) ════════════════
  { id: "session-직업능력개발훈련교사-2026-1", certificationId: "seed-직업능력개발훈련교사", sessionYear: 2026, sessionRound: 1, applicationStartAt: d("2026-03-02"), applicationEndAt: d("2026-03-20"), examDateWritten: d("2026-04-25"), resultAnnouncementAt: d("2026-06-12"), examFee: 30000, subjects: "교육훈련론, 직업능력개발훈련법령, 교과목 관련 전문이론", announcementUrl: "https://www.hrdkorea.or.kr", applicationUrl: "https://www.hrdkorea.or.kr", source: "HRD Korea" },
];

async function main() {
  // 기존 세션 데이터 정리 (upsert 충돌 방지)
  await prisma.examSession.deleteMany({
    where: { source: { in: ["Q-Net", "대한상공회의소", "국사편찬위원회", "한국데이터산업진흥원", "금융감독원", "특허청", "한국세무사회", "한국공인회계사회", "한국생산성본부", "한국정보통신진흥협회", "한국금융연수원", "금융투자협회", "일본국제교류기금", "KBS", "법무부", "행정안전부", "경찰청", "한국보건의료인국가시험원", "대한건축사협회", "한국FPSB", "YBM", "ACTFL", "한국HSK사무국", "서울대학교 TEPS관리위원회", "ETS", "영진닷컴", "한국무역협회", "한국어문회", "한자교육진흥회", "한국국어능력평가협회", "국립국어원", "국가평생교육진흥원", "한국청소년활동진흥원", "한국뇌과학연구원", "HRD Korea", "보험연수원", "한국FPSB"] } },
  });
  console.log("Cleared old exam sessions.");
  console.log("Seeding certifications...");

  for (const cert of certifications) {
    await prisma.certification.upsert({
      where: { id: `seed-${cert.nameKo}` },
      update: cert,
      create: { id: `seed-${cert.nameKo}`, ...cert },
    });
  }

  console.log(`Seeded ${certifications.length} certifications.`);
  console.log("Seeding exam sessions...");

  for (const session of sessions) {
    await prisma.examSession.upsert({
      where: { id: session.id },
      update: session,
      create: session,
    });
  }

  console.log(`Seeded ${sessions.length} exam sessions.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
