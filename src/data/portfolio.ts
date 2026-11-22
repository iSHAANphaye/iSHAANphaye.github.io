import type {
  EducationItem,
  ExperienceItem,
  HonorItem,
  KpiMetric,
  Project,
  SkillGroup,
} from "@/types/portfolio";

export const PROFILE = {
  name: "Ishaan Shailesh Phaye",
  firstName: "Ishaan",
  lastName: "Shailesh Phaye",
  roleTitle: "Systems & Applied AI Engineer",
  roleSubtitle: "SDE • AI Infrastructure • Distributed Systems",
  availability:
    "Open to SDE, ML & AI Systems Roles (Immediate • India / Global Remote)",
  location: "Lucknow, Uttar Pradesh, India",
  preferredLocations: [
    "Global Remote",
    "Bengaluru",
    "Pune",
    "Hyderabad",
    "Noida",
    "Gurugram",
  ],
  degreeBadge: "M.Tech CS '27 (IIIT Lucknow) • B.Tech IT '23",
  shortBio:
    "Engineering low-latency RAG pipelines, custom C++ storage engines, and PyTorch transformer architectures with a focus on measurable throughput and production reliability.",
  extendedBio:
    "M.Tech Computer Science candidate at IIIT Lucknow and former ML Intern at Datanomers. Experienced across the full systems stack—from B+Tree disk storage and Write-Ahead Logging in C++ to sub-300ms concurrent vector search and fine-tuned LLMs.",
  email: "ishaanphaye@gmail.com",
  resumePath: "/resume.pdf",
  workAuthorization:
    "Authorized to work in India and eligible for Global Remote Contractor roles from India (no visa sponsorship required; immediate 0-day notice period).",
  links: {
    portfolio: "https://ishaanphaye.dev",
    github: "https://github.com/iSHAANphaye",
    linkedin: "https://www.linkedin.com/in/ishaan-phaye-6786971b3/",
    leetcode: "https://leetcode.com/ishaanroxx/",
  },
  coreStack: [
    "C++",
    "Python",
    "TypeScript",
    "PyTorch",
    "FastAPI",
    "LangChain / RAG",
    "Qdrant",
    "Docker",
    "Distributed Systems",
  ],
  marqueeItems: [
    "OPEN TO SDE, ML & AI SYSTEMS ROLES",
    "IMMEDIATE AVAILABILITY • INDIA & GLOBAL REMOTE",
    "C++ • PYTHON • PYTORCH • FASTAPI • QDRANT",
    "DISTRIBUTED SYSTEMS • B+TREE & WAL • CONCURRENT RAG",
    "IIIT LUCKNOW M.TECH CS • 8TH / 3,500+ TECHXR",
  ],
  suggestedAiQuestions: [
    "How did ClipSense AI cut search latency by 96%?",
    "Walk me through the C++ Mini DB Storage Engine architecture.",
    "What did Ishaan achieve during his ML internship at Datanomers?",
    "Is he available immediately for remote or India-based roles?",
  ],
} as const;

export const KPI_METRICS: KpiMetric[] = [
  {
    value: "96%",
    label: "Search Latency Cut",
    sublabel: "8s down to <0.3s across 35+ playlists (ClipSense AI)",
  },
  {
    value: "35%",
    label: "Inference Latency Drop",
    sublabel: "Production ML pipeline optimization at Datanomers",
  },
  {
    value: "95.67%",
    label: "GPT-2 SFT Accuracy",
    sublabel: "Custom PyTorch 124M/355M architecture & fine-tuning",
  },
  {
    value: "8th / 3,500+",
    label: "IIT Roorkee TechXR",
    sublabel: "National hackathon finalist • 400+ LeetCode solved",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "clipsense-ai",
    title: "ClipSense AI",
    subtitle: "Scalable Video RAG & Search Platform",
    category: "AI / ML",
    flagship: true,
    metricHighlight: "96% latency reduction (8s → <0.3s) in sub-80 MB RAM",
    summary:
      "Production RAG platform turning YouTube videos and playlists into queryable knowledge bases with two-stage retrieval and synced timestamp citations.",
    techStack: [
      "FastAPI",
      "React",
      "TypeScript",
      "Qdrant",
      "MongoDB",
      "LangChain",
      "Groq",
      "Docker",
    ],
    githubUrl: "https://github.com/iSHAANphaye/ClipSense",
    liveUrl: "https://clipsense-ai.onrender.com",
    image: "/projects/clipsense.svg",
    architectureDiagram: "/projects/arch-clipsense.svg",
    highlights: [
      "Two-stage retrieval combining Qdrant dense vector search with cross-encoder re-ranking inside a sub-80 MB serverless RAM budget.",
      "Concurrent thread-pool retrieval across 35+ video playlists, cutting end-to-end search latency from 8s to under 0.3s.",
      "Dual-token JWT authentication paired with clickable citations synced directly to an embedded video player.",
    ],
    benchmarks: [
      {
        metric: "End-to-End Search Latency",
        result: "< 0.3 s (-96%)",
        context: "Down from 8.0s baseline via thread-pool concurrency",
      },
      {
        metric: "Serverless Memory Footprint",
        result: "< 80 MB RAM",
        context: "Production deployment on constrained free-tier container",
      },
      {
        metric: "Ingestion Scale",
        result: "35+ Playlists",
        context: "Parallel transcript chunking & Qdrant upsert pipeline",
      },
    ],
  },
  {
    id: "mini-db-storage-engine",
    title: "Mini Database Storage Engine",
    subtitle: "Disk-Backed C++ Key-Value Store with B+Tree & WAL",
    category: "Systems",
    flagship: true,
    metricHighlight: "O(log n) B+Tree lookups + crash-safe ACID WAL recovery",
    summary:
      "Custom storage engine built from scratch in C++ featuring fixed-size page serialization, a buffer pool manager, and Write-Ahead Logging.",
    techStack: [
      "C++",
      "B+Tree Indexing",
      "Write-Ahead Logging",
      "Disk I/O",
      "Buffer Pool",
    ],
    githubUrl: "https://github.com/iSHAANphaye/Mini-Database-Storage-Engine",
    image: "/projects/mini-db.svg",
    architectureDiagram: "/projects/arch-minidb.svg",
    highlights: [
      "Implemented a disk-backed B+Tree index supporting O(log n) point lookups and sequential range scans across linked leaf nodes.",
      "Engineered Write-Ahead Logging (WAL) flushing sequential logs before in-place page writes to guarantee ACID atomicity and crash recovery.",
      "Built a cache-conscious buffer pool manager handling fixed-size page serialization and eviction.",
    ],
    benchmarks: [
      {
        metric: "Lookup & Range Complexity",
        result: "O(log n)",
        context: "Balanced B+Tree with doubly-linked leaf traversal",
      },
      {
        metric: "Durability Model",
        result: "Crash-Safe ACID",
        context: "Sequential WAL flush + automated replay on restart",
      },
      {
        metric: "Memory Management",
        result: "Fixed-Size Pages",
        context: "Custom buffer pool decoupling logical ops from Disk I/O",
      },
    ],
  },
  {
    id: "gpt2-from-scratch",
    title: "GPT-2 from Scratch",
    subtitle: "Architecture, Pretraining & SFT Inference Engine",
    category: "AI / ML",
    flagship: true,
    metricHighlight: "95.67% classification test accuracy + Alpaca SFT",
    summary:
      "Complete 124M/355M GPT-2 transformer built from scratch in PyTorch with OpenAI weight transfer, instruction tuning, and an interactive Flask UI.",
    techStack: ["PyTorch", "SFT", "BPE Tokenization", "Flask", "NLP"],
    githubUrl: "https://github.com/iSHAANphaye/GPT2-From-Scratch",
    image: "/projects/gpt2.svg",
    architectureDiagram: "/projects/arch-gpt2.svg",
    highlights: [
      "Built causal multi-head self-attention, Byte Pair Encoding (BPE) tokenization, and pre-LayerNorm residual blocks from scratch in PyTorch.",
      "Mapped and loaded official OpenAI pretrained weights directly into the custom architecture.",
      "Fine-tuned checkpoints for sequence classification (95.67% test accuracy) and Alpaca instruction following, served with Top-k sampling and temperature control.",
    ],
    benchmarks: [
      {
        metric: "Sequence Classification",
        result: "95.67% Accuracy",
        context: "Evaluated on held-out test split after fine-tuning",
      },
      {
        metric: "Model Scales Supported",
        result: "124M & 355M",
        context: "Exact weight-loading parity with OpenAI checkpoints",
      },
      {
        metric: "Decoding Controls",
        result: "Top-k & Temp",
        context: "Autoregressive generation exposed via interactive Flask app",
      },
    ],
  },
  {
    id: "object-detection-app",
    title: "Real-Time Object Detection App",
    subtitle: "Quantized On-Device Computer Vision Pipeline",
    category: "Edge",
    flagship: false,
    metricHighlight: "93% detection accuracy running 100% offline on mobile",
    summary:
      "Low-latency Flutter mobile app running a quantized SSD MobileNet TFLite model trained on MSCOCO with zero cloud dependencies.",
    techStack: ["Flutter", "TensorFlow", "TFLite", "SSD MobileNet", "MSCOCO"],
    githubUrl: "https://github.com/iSHAANphaye/Object-Detection-App",
    image: "/projects/object-detection.svg",
    highlights: [
      "Trained SSD MobileNet on MSCOCO and exported quantized TFLite graphs for constrained mobile hardware.",
      "Achieved 93% object detection and classification accuracy in real-time camera feeds without network round-trips.",
    ],
    benchmarks: [
      {
        metric: "Detection Accuracy",
        result: "93%",
        context: "Quantized SSD MobileNet evaluated on MSCOCO classes",
      },
      {
        metric: "Inference Mode",
        result: "100% On-Device",
        context: "Zero cloud latency or external API dependency",
      },
    ],
  },
  {
    id: "vaatika-zone",
    title: "Vaatika Zone",
    subtitle: "Full-Stack E-Commerce Web Application",
    category: "Full-Stack",
    flagship: false,
    metricHighlight: "20% lower DB query latency via compound MongoDB indexing",
    summary:
      "End-to-end containerized e-commerce platform built for a regional startup, owning schema design, API performance, and Docker deployment.",
    techStack: [
      "React",
      "Express.js",
      "MongoDB",
      "Node.js",
      "Tailwind CSS",
      "Docker",
    ],
    githubUrl: "https://github.com/iSHAANphaye/Vaatika-Zone-personal",
    image: "/projects/vaatika.svg",
    highlights: [
      "Owned the full SDLC from database schema modeling to responsive frontend and Dockerized deployment.",
      "Reduced backend API query processing latency by 20% through targeted MongoDB compound indexing.",
    ],
    benchmarks: [
      {
        metric: "DB Query Latency",
        result: "-20%",
        context: "Compound indexing strategy on high-frequency product queries",
      },
      {
        metric: "Deployment",
        result: "Dockerized",
        context: "Reproducible full-stack container setup",
      },
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["C++", "C", "Python", "TypeScript", "JavaScript", "SQL", "Bash / Shell"],
  },
  {
    category: "AI, LLMs & Deep Learning",
    items: [
      "PyTorch",
      "Transformers",
      "HuggingFace",
      "LangChain",
      "LangGraph",
      "RAG",
      "LoRA / QLoRA",
      "FastEmbed",
      "RAGAS",
      "Scikit-learn",
      "TensorFlow / TFLite",
      "OpenCV",
    ],
  },
  {
    category: "Backend & Frontend",
    items: [
      "FastAPI",
      "Flask",
      "Node.js",
      "Express.js",
      "React",
      "RESTful APIs",
      "Microservices",
    ],
  },
  {
    category: "Databases & Vector Stores",
    items: [
      "Qdrant",
      "Chroma",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "SQLite",
      "Elasticsearch",
    ],
  },
  {
    category: "Core Architecture & CS",
    items: [
      "Distributed Systems",
      "System Design",
      "Concurrency & Multithreading",
      "B+Tree Indexing",
      "Write-Ahead Logging (WAL)",
      "ACID Transactions",
      "Operating Systems",
      "Computer Networks",
      "DSA",
    ],
  },
  {
    category: "Infrastructure & Tooling",
    items: [
      "Docker",
      "AWS",
      "Linux",
      "Git",
      "GitHub Actions (CI/CD)",
      "Render",
      "Postman",
    ],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "datanomers-ml-intern",
    role: "Machine Learning Intern",
    organization: "Datanomers",
    period: "June 2022 – December 2022",
    location: "Remote",
    type: "Work",
    bullets: [
      "Engineered a high-scale Python data pipeline to preprocess and encode Standard Industrial Classification (SIC) codes for banking-domain ML models.",
      "Optimized predictive ML algorithms for real-time production inference, reducing response latency by 35%.",
      "Built and unit-tested 40+ automated rule-based validation checks prior to ingestion, improving model signal accuracy by up to 30%.",
    ],
  },
];

export const HONORS: HonorItem[] = [
  {
    title: "TechXR Hackathon — IIT Roorkee",
    metric: "8th / 3,500+",
    detail:
      "Ranked 8th nationally among 3,500+ participants, earning a competitive 3-month internship offer.",
  },
  {
    title: "Competitive Programming (LeetCode)",
    metric: "400+ Solved",
    detail:
      "Consistent algorithmic problem solving focused on optimal time and space complexity.",
  },
  {
    title: "TCS National Qualifier Test (NQT)",
    metric: "Top 200 All-India",
    detail: "Achieved Top 200 national rank with one month of focused preparation.",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Technology (M.Tech) in Computer Science",
    institution: "Indian Institute of Information Technology, Lucknow",
    shortName: "IIIT Lucknow",
    period: "2025 – Present (Expected 2027)",
    location: "Lucknow, Uttar Pradesh, India",
    cgpa: "8.36 / 10",
    highlights: [
      "Graduate focus on Distributed Systems, Deep Learning, and High-Performance AI Infrastructure.",
      "Active builder of production RAG platforms, custom C++ storage engines, and transformer architectures.",
    ],
  },
  {
    degree: "Bachelor of Technology (B.Tech) in Information Technology",
    institution: "Shri Shankaracharya Institute of Professional Management & Technology",
    shortName: "SSIPMT Raipur",
    period: "2019 – 2023",
    location: "Raipur, Chhattisgarh, India",
    cgpa: "8.3 / 10",
    highlights: [
      "Core foundations in Data Structures & Algorithms, Operating Systems, DBMS, and Computer Networks.",
      "Completed 6-month remote ML Internship at Datanomers and led on-device TFLite computer vision research.",
    ],
  },
];
