import { MLIntentCategoryId, MLIntentCategoryName, HotspotContact } from '../types/sputnik';

export interface GroundedDoc {
  doc_id: string;
  category: MLIntentCategoryName;
  url: string;
  title: string;
  text: string;
  keywords: string[];
}

/**
 * Canonical 5 ML Intent Categories mapped from LabelEncoder (alphabetically sorted)
 * Matching label_mapping.json from Sputnik ML pipeline
 */
export const CATEGORY_MAPPING: Record<MLIntentCategoryId, MLIntentCategoryName> = {
  0: 'Academics & Curriculum',
  1: 'Administration & Governance',
  2: 'Admissions & Careers',
  3: 'Campus Facilities & Hostels',
  4: 'Events & Notices',
};

export const CATEGORY_IDS: Record<MLIntentCategoryName, MLIntentCategoryId> = {
  'Academics & Curriculum': 0,
  'Administration & Governance': 1,
  'Admissions & Careers': 2,
  'Campus Facilities & Hostels': 3,
  'Events & Notices': 4,
};

export const CATEGORY_THEMES: Record<
  MLIntentCategoryName,
  { text: string; bg: string; border: string; dot: string }
> = {
  'Academics & Curriculum': {
    text: '#0369A1',
    bg: '#E0F2FE',
    border: '#BAE6FD',
    dot: '#0284C7',
  },
  'Administration & Governance': {
    text: '#4338CA',
    bg: '#E0E7FF',
    border: '#C7D2FE',
    dot: '#4F46E5',
  },
  'Admissions & Careers': {
    text: '#B45309',
    bg: '#FEF3C7',
    border: '#FDE68A',
    dot: '#D97706',
  },
  'Campus Facilities & Hostels': {
    text: '#047857',
    bg: '#D1FAE5',
    border: '#A7F3D0',
    dot: '#059669',
  },
  'Events & Notices': {
    text: '#BE123C',
    bg: '#FFE4E6',
    border: '#FECDD3',
    dot: '#E11D48',
  },
};

/**
 * Authentic Grounded ABV-IIITM Gwalior Corpus (1,780 passage mirror)
 */
export const GROUNDED_DOCS: GroundedDoc[] = [
  // Campus Facilities & Hostels
  {
    doc_id: 'doc_142',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/campus-life/hostels',
    title: 'Gangotri Girls Hostel (GH) Administrative & Residential Manual',
    text: 'Gangotri Girls Hostel (GH) at ABV-IIITM Gwalior provides residential accommodation equipped with 24/7 security, high-speed campus LAN/Wi-Fi, and resident warden supervision. Rooms are allocated on twin-sharing for junior batches and single occupancy for senior scholars. Entry timings stipulate reporting to the hostel turnstiles by 21:30 hrs unless formal academic or lab extension permissions have been authorized by the Council of Wardens.',
    keywords: ['girls hostel', 'gh', 'gangotri', 'turnstiles', 'curfew', 'warden', 'timings', 'security', 'rooms', 'facilities', 'residential'],
  },
  {
    doc_id: 'doc_143',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/campus-life/mess-dining',
    title: 'Hostel Dining & Student Mess Operational Guidelines',
    text: 'Hostel Mess Committee regulations: dietary schedules, monthly rebate rules, hygiene standards, dining hall decorum, and common room recreational equipment inventory. Dining facilities include an attached mess operational for breakfast (07:30–09:30), lunch (12:30–14:15), evening snacks (17:00–18:00), and dinner (19:45–21:45). Common room facilities offer indoor badminton courts, reading lounges, dedicated laundry zones with automated washing units, and immediate medical on-call access to the Institute Health Centre.',
    keywords: ['mess', 'dining', 'food', 'breakfast', 'lunch', 'dinner', 'snacks', 'laundry', 'rebate', 'badminton', 'schedule'],
  },
  {
    doc_id: 'doc_144',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/campus-life/boys-hostels',
    title: 'Aravali, Nilgiri & Shivalik Boys Residential Halls',
    text: 'Undergraduate and postgraduate male students reside in Aravali (BH-1), Nilgiri (BH-2), and Shivalik (BH-3) hostels. Each residential unit provides individual study desks, ergonomic chairs, ceiling fans, high-bandwidth Gbps network drops, and geyser-equipped sanitary zones. The student-elected Hostel Council works in liaison with chief wardens to oversee cleanliness, quiet study hours after 23:00, and sports gear issuance.',
    keywords: ['boys hostel', 'bh1', 'bh2', 'bh3', 'aravali', 'nilgiri', 'shivalik', 'council', 'warden', 'geyser', 'lan'],
  },
  {
    doc_id: 'doc_185',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/facilities/library',
    title: 'Learning Resource Centre (Central Library) Resources & Timings',
    text: 'The Learning Resource Centre (LRC) at ABV-IIITM Gwalior is a multi-floor digital repository housing over 30,000 volumes, international conference proceedings, and subscribed access to IEEE Xplore, ACM Digital Library, SpringerLink, and ScienceDirect. The library operates from 09:00 to 22:00 on weekdays (extended to 00:00 during mid-semester and end-semester examinations). It features RFID self-checkout kiosks, a dedicated cyber lab, and air-conditioned group discussion suites.',
    keywords: ['library', 'central library', 'books', 'journals', 'lrc', 'reading room', 'ieee', 'acm', 'hours', 'timings', 'rfid'],
  },
  {
    doc_id: 'doc_188',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/facilities/sports-complex',
    title: 'Sports Complex, Gymnasium & Athletic Grounds Infrastructure',
    text: 'The 160-acre campus features a comprehensive sports complex complete with a standard 400m running track, turf cricket pitch, floodlit basketball and lawn tennis courts, volleyball courts, and a multi-station modern gymnasium. Qualified physical training instructors coordinate inter-hostel leagues (Urja) and prepare institute teams for Inter-IIIT sports meets.',
    keywords: ['sports', 'gym', 'gymnasium', 'ground', 'cricket', 'basketball', 'tennis', 'urja', 'athletic', 'fitness'],
  },
  {
    doc_id: 'doc_190',
    category: 'Campus Facilities & Hostels',
    url: 'https://www.iiitm.ac.in/index.php/en/facilities/health-centre',
    title: 'Institute Health Care Center Operational Protocols',
    text: 'The Institute Health Care Center operates 24/7 with resident medical officers, visiting specialists in cardiology, orthopedics, and psychiatry, and fully stocked pharmacy dispensing essential medications free of charge to registered students and staff. A dedicated emergency ambulance is stationed around the clock for hospital transit to Gwalior city medical institutes.',
    keywords: ['health center', 'medical', 'doctor', 'hospital', 'medicine', 'ambulance', 'clinic', 'emergency', 'dispensary'],
  },

  // Academics & Curriculum
  {
    doc_id: 'doc_041',
    category: 'Academics & Curriculum',
    url: 'https://www.iiitm.ac.in/index.php/en/academics/btech-curriculum',
    title: 'Undergraduate B.Tech Computer Science & Engineering Ordinances',
    text: 'The 4-year B.Tech curriculum in Computer Science and Engineering (CSE) and Information Technology (IT) emphasizes fundamental computer architecture, data structures & algorithms, operating systems, compiler design, and distributed systems. Students complete mandatory core laboratory practicals, industry internships between semesters 6 and 7, and a capstone B.Tech project evaluated by external examiners.',
    keywords: ['curriculum', 'b.tech', 'cse', 'it', 'syllabus', 'credits', 'internship', 'capstone', 'courses', 'grading', 'cgpa'],
  },
  {
    doc_id: 'doc_045',
    category: 'Academics & Curriculum',
    url: 'https://www.iiitm.ac.in/index.php/en/academics/integrated-mtech',
    title: 'Integrated Post-Graduate (IPG) B.Tech + M.Tech / MBA Framework',
    text: 'ABV-IIITM Gwalior offers premier 5-year Dual Degree Integrated Post Graduate programs: B.Tech (IT) + M.Tech (IT) and B.Tech (IT) + MBA. The dual degree blends rigorous computer engineering coursework with advanced specializations in AI, cybersecurity, financial management, marketing analytics, and supply chain technology.',
    keywords: ['ipg', 'dual degree', 'integrated', 'm.tech', 'mba', 'specialization', 'curriculum', 'credits'],
  },
  {
    doc_id: 'doc_052',
    category: 'Academics & Curriculum',
    url: 'https://www.iiitm.ac.in/index.php/en/academics/academic-calendar',
    title: 'Senate Academic Regulations: Attendance, Grading & CGPA Calculation',
    text: 'Under Senate academic rules, a minimum of 75% attendance in lectures and laboratory sessions is mandatory to appear for End-Semester Examinations. The institute enforces a 10-point relative grading scale where Grade Point Average (SGPA/CGPA) is computed based on credit-weighted numerical scores. Make-up exams are granted only upon certified medical contingency validated by the Chief Medical Officer.',
    keywords: ['attendance', '75%', 'grading', 'cgpa', 'sgpa', 'senate', 'exams', 'midsem', 'endsem', 'backlog'],
  },

  // Admissions & Careers
  {
    doc_id: 'doc_081',
    category: 'Admissions & Careers',
    url: 'https://www.iiitm.ac.in/index.php/en/admissions/undergraduate-btech',
    title: 'Undergraduate B.Tech & IPG Admission Eligibility & Seat Matrix',
    text: 'Admissions to the 4-year B.Tech (CSE) and 5-year Integrated Dual Degree (IT + M.Tech / MBA) programs are conducted through JoSAA (Joint Seat Allocation Authority) and CSAB based strictly on candidate All India Ranks (AIR) in JEE (Main). Candidates must satisfy the top 20 percentile or 75% aggregate score requirement in their Class XII board examinations.',
    keywords: ['admission', 'b.tech admission', 'criteria', 'jee main', 'josaa', 'csab', 'eligibility', 'cut off', 'rank', 'seat matrix'],
  },
  {
    doc_id: 'doc_084',
    category: 'Admissions & Careers',
    url: 'https://www.iiitm.ac.in/index.php/en/admissions/postgraduate-mtech-msc',
    title: 'M.Tech, M.Sc. & MBA Admission Pathways (GATE / CCMT / CAT / CCMN)',
    text: 'Postgraduate admissions for M.Tech programs (Computer Science, Information Network Security, VLSI & Embedded Systems) require a valid GATE scorecard through CCMT centralized counselling. M.Sc. in Mathematics and Scientific Computing admits via IIT-JAM / CCMN, while MBA admissions require a valid percentile in CAT conducted by IIMs followed by Group Discussion and Personal Interview (GD/PI).',
    keywords: ['gate', 'ccmt', 'cat', 'm.tech admission', 'msc', 'mba admission', 'jam', 'counselling', 'eligibility'],
  },
  {
    doc_id: 'doc_092',
    category: 'Admissions & Careers',
    url: 'https://www.iiitm.ac.in/index.php/en/placements/placement-statistics',
    title: 'Training and Placement Cell (T&P) Campus Recruitment Statistics',
    text: 'The Training and Placement Cell at ABV-IIITM Gwalior facilitates internships and final campus placements with leading global corporations (Google, Microsoft, Amazon, Adobe, Goldman Sachs, Samsung R&D, Qualcomm). Over 90% of eligible students secure high-CTC job offers, with an institute average CTC exceeding INR 22 LPA and top international packages.',
    keywords: ['placement', 'placements', 't&p', 'package', 'salary', 'ctc', 'companies', 'internship', 'recruitment', 'careers'],
  },

  // Administration & Governance
  {
    doc_id: 'doc_011',
    category: 'Administration & Governance',
    url: 'https://www.iiitm.ac.in/index.php/en/governance/board-of-governors',
    title: 'Institute Board of Governors, Senate & Directorate Leadership',
    text: 'ABV-IIITM Gwalior is an autonomous Institute of National Importance established by the Ministry of Education, Government of India under the IIIT Act. The institute is governed by the Board of Governors (BoG) chaired by eminent academicians and industry leaders, with the Director serving as the chief executive and administrative officer.',
    keywords: ['governance', 'board of governors', 'bog', 'senate', 'director', 'registrar', 'ministry of education', 'act'],
  },
  {
    doc_id: 'doc_018',
    category: 'Administration & Governance',
    url: 'https://www.iiitm.ac.in/index.php/en/governance/administrative-directory',
    title: 'Administrative Block Key Desks, Fee Portals & Contact Officers',
    text: 'The Administrative Block houses the Office of the Registrar, Dean of Academic Affairs (DoAA), Dean of Student Affairs (DoSA), and Finance & Accounts section. Official student fee payments, semester registration clearances, bonafide certificate requests, and railway travel concessions are processed through the Student Portal and verified at Ground Floor counter 3.',
    keywords: ['admin', 'administration', 'registrar', 'dosa', 'doaa', 'dean', 'fees', 'bonafide', 'concession', 'counter'],
  },

  // Events & Notices
  {
    doc_id: 'doc_210',
    category: 'Events & Notices',
    url: 'https://www.iiitm.ac.in/index.php/en/campus-life/aurora-cultural-fest',
    title: 'Aurora Annual Cultural Fest & Infotsav Techno-Management Conclave',
    text: 'ABV-IIITM Gwalior hosts Aurora, Central India’s premier annual cultural extravaganza featuring pro-nights, battle of the bands, choreography, and drama. The institute also organizes Infotsav, the official technical fest featuring hackathons, algorithmic contests, robotics leagues, and guest lectures from industry luminaries. In addition, the Sports Council organises Urja every winter.',
    keywords: ['events', 'fest', 'aurora', 'infotsav', 'cultural', 'technical fest', 'hackathon', 'urja', 'notices', 'celebration'],
  },
  {
    doc_id: 'doc_215',
    category: 'Events & Notices',
    url: 'https://www.iiitm.ac.in/index.php/en/notices/tenders-and-circulars',
    title: 'Official Gazette: Senate Circulars, Convocation & Conference Notices',
    text: 'Official notifications, faculty recruitment circulars, institutional procurement tenders, and announcements regarding the Annual Convocation and national IEEE conferences are published on the official web portal at iiitm.ac.in. Students and staff are advised to check the digital notice board for timely compliance with Senate directives.',
    keywords: ['notices', 'circular', 'tender', 'convocation', 'conference', 'announcement', 'gazette', 'deadlines'],
  },
];

/**
 * Campus Hotspot Directory for Low-Confidence (<50%) Fallbacks
 * Colloquial student inquiries like daily mess menus, changing club auditions, etc.
 */
export const CAMPUS_HOTSPOTS: HotspotContact[] = [
  {
    id: 'mess_committee',
    title: 'Hostel Dining & Student Mess Committee',
    office: 'Student Activity Centre (SAC) Office & Mess Secretariat',
    location: 'Central Dining Mess, 1st Floor Common Office',
    timing: 'Breakfast 07:30–09:30 | Lunch 12:30–14:15 | Dinner 19:45–21:45',
    contact: 'mess-council@iiitm.ac.in · Ext: 312',
    scope: 'Daily rotating dietary menu, weekly special dinners, rebate forms, and hygiene inspection logs.',
  },
  {
    id: 'warden_council',
    title: 'Council of Wardens & Chief Warden Office',
    office: 'Office of Dean of Student Affairs (DoSA)',
    location: 'Administrative Block, Ground Floor, Wing B',
    timing: 'Mon–Fri 15:30–18:00 (Student grievance hours)',
    contact: 'chiefwarden@iiitm.ac.in · Ext: 204',
    scope: 'Hostel room allotments, late night lab extension passes, turnstile biometric exceptions.',
  },
  {
    id: 'health_emergency',
    title: 'Institute Health Care Center (24/7 Outpatient & Ambulance)',
    office: 'Health Centre Medical Desk',
    location: 'Near Gate 1 Perimeter Avenue (Opposite Gangotri Hostel)',
    timing: 'OPD: 08:30–13:00, 16:30–20:00 | Emergency: 24/7',
    contact: 'healthcenter@iiitm.ac.in · Emergency Call: +91-751-2449800',
    scope: 'Immediate doctor consultation, first aid, free prescription pharmacy, and ambulance service.',
  },
  {
    id: 'academic_section',
    title: 'Office of Dean of Academic Affairs (DoAA)',
    office: 'Academic Secretariat',
    location: 'Admin Block, 1st Floor, Room 108',
    timing: 'Mon–Fri 10:00–17:00 (Break: 13:00–14:00)',
    contact: 'academic@iiitm.ac.in · Ext: 108',
    scope: 'Grade cards, course registration, attendance condonation, examination roll lists, transcripts.',
  },
  {
    id: 'student_gymkhana',
    title: 'Student Gymkhana & Cultural Clubs Secretariat',
    office: 'SAC Activity Hub & Club Rooms',
    location: 'Open-Air Amphitheatre Complex & SAC Building',
    timing: 'Evenings 17:30–22:00',
    contact: 'gymkhana@iiitm.ac.in · Instagram: @iiitm_student_council',
    scope: 'Club auditions (Rotaract, ACM, IEEE, Dance, Music, E-Cell), fest schedules (Aurora, Infotsav).',
  },
];
