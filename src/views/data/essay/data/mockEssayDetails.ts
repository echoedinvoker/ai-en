// 建議介面定義
export interface Suggestion {
  suggestedBy: string // 建議的人
  originalContent: string // 原始的內容
  correctedContent: string // 修正的方案
}

// 字彙回饋介面
export interface VocabularyFeedback {
  score: number // 字彙 1-10
  numVocabulary: number // 使用的字彙數量
  wordCount: number // 總字數
  spellingErrors: number // 拼字錯誤
  vocabularyLevel: number // 字彙等級 1-6
  summary: string // 總結
}

// 文法回饋介面
export interface GrammarFeedback {
  score: number // 文法 1-10
  form: number // 型態 1-10
  preposition: number // 介係詞 1-10
  punctuation: number // 標點符號 1-10
  summary: string // 總結
}

export interface ContentFeedback {
  score: number // 內容 1-10
  summary: string // 總結
}

export interface OrganizationFeedback {
  score: number // 組織 1-10
  summary: string // 總結
}

// 寫作回饋介面
export interface WritingFeedback {
  progress: number // 進度 0.0-1.0
  vocabulary: VocabularyFeedback // 字彙
  grammar: GrammarFeedback // 文法
  content: ContentFeedback // 內容
  organization: OrganizationFeedback // 組織
}

// 作文詳細資料介面
export interface EssayDetail {
  id: string // 作文ID
  name: string // 作文名稱
  author: string // 作文擁有者
  owner: string // 試題擁有者
  aiScore: number // AI批閱分數
  teacherScore: number | null // 教師批閱分數
  content: string // 作文內容
  suggestions: Suggestion[] // 建議
  writingFeedback: WritingFeedback // 寫作回饋
  createdAt: string // 繳交時間
  createdBy: string // 建立人員
  updatedAt: string // 最近修改時間
  updatedBy: string // 更新修改人員
}

// 作文詳細資料 mock 資料
export const mockEssayDetails: Record<string, EssayDetail> = {
  'LT_WR_0000001': {
    id: 'LT_WR_0000001',
    name: 'My Dream Job',
    author: '王小明',
    owner: '張老師',
    aiScore: 85,
    teacherScore: 88,
    content: `My dream job is to become a software engineer. I have always been fascinated by technology and how it can solve real-world problems. Programming allows me to be creative while also being logical and systematic.

I believe that software engineering is the perfect career for me because it combines my passion for problem-solving with my interest in technology. In this field, I can continuously learn new technologies and work on innovative projects that can make a positive impact on society.

To achieve this goal, I am currently studying computer science and practicing programming languages like Python and JavaScript. I also participate in coding competitions and work on personal projects to improve my skills.

In conclusion, becoming a software engineer is not just a career choice for me, but a way to contribute to the advancement of technology and help create solutions that can benefit people around the world.`,
    suggestions: [
      {
        suggestedBy: 'AI系統',
        originalContent: 'I have always been fascinated by technology',
        correctedContent: 'I have always been fascinated by technology and its applications'
      },
      {
        suggestedBy: '張老師',
        originalContent: 'Programming allows me to be creative',
        correctedContent: 'Programming allows me to express creativity'
      }
    ],
    writingFeedback: {
      progress: 0.85,
      vocabulary: {
        score: 8,
        numVocabulary: 50, // 使用的字彙數量
        wordCount: 180,
        spellingErrors: 1,
        vocabularyLevel: 4,
        summary: '字彙使用適當，建議增加更多高級詞彙'
      },
      grammar: {
        score: 8,
        form: 7,
        preposition: 8,
        punctuation: 9,
        summary: '文法結構良好，時態使用正確'
      },
      content: {
        score: 8,
        summary: '內容清晰，主題明確，建議增加更多細節和例子'
      },
      organization: {
        score: 9,
        summary: '文章結構良好，段落分明，邏輯清晰'
      }
    },
    createdAt: '2024-01-15T10:30:00',
    createdBy: '王小明',
    updatedAt: '2024-01-20T14:15:00',
    updatedBy: '張老師'
  },

  'LT_WR_0000002': {
    id: 'LT_WR_0000002',
    name: 'Environmental Protection',
    author: '李美華',
    owner: '陳老師',
    aiScore: 92,
    teacherScore: 90,
    content: `Environmental protection has become one of the most pressing issues of our time. With climate change, pollution, and deforestation threatening our planet, it is crucial that we take immediate action to preserve our environment for future generations.

There are several ways we can contribute to environmental protection. First, we should reduce our carbon footprint by using public transportation, cycling, or walking instead of driving cars. Second, we need to practice the three Rs: reduce, reuse, and recycle. This means consuming less, finding new uses for old items, and properly disposing of waste materials.

Furthermore, governments and corporations must play their part by implementing stricter environmental regulations and investing in renewable energy sources such as solar and wind power. Education is also essential – we must raise awareness about environmental issues and teach people how to live more sustainably.

In conclusion, environmental protection requires collective effort from individuals, communities, and governments. Only by working together can we create a sustainable future and ensure that our planet remains habitable for generations to come.`,
    suggestions: [
      {
        suggestedBy: 'AI系統',
        originalContent: 'has become one of the most pressing issues',
        correctedContent: 'has emerged as one of the most critical challenges'
      },
      {
        suggestedBy: '陳老師',
        originalContent: 'we must raise awareness',
        correctedContent: 'we must actively promote awareness'
      }
    ],
    writingFeedback: {
      progress: 0.92,
      vocabulary: {
        score: 9,
        numVocabulary: 62,
        wordCount: 220,
        spellingErrors: 0,
        vocabularyLevel: 5,
        summary: '優秀的字彙運用，詞彙豐富且準確'
      },
      grammar: {
        score: 9,
        form: 9,
        preposition: 8,
        punctuation: 10,
        summary: '文法結構優秀，句型變化豐富'
      },
      content: {
        score: 9,
        summary: '內容深刻，論點清晰且有力，建議增加更多實例支持'
      },
      organization: {
        score: 10,
        summary: '文章結構非常清晰，段落過渡自然，邏輯性強'
      }
    },
    createdAt: '2024-02-10T09:20:00',
    createdBy: '李美華',
    updatedAt: '2024-02-25T16:40:00',
    updatedBy: '陳老師'
  },

  'LT_WR_0000003': {
    id: 'LT_WR_0000003',
    name: 'The Importance of Education',
    author: '張志強',
    owner: '林老師',
    aiScore: 78,
    teacherScore: null,
    content: `Education is very important in our life. It help us to learn many things and become better person. Without education, people cannot get good job or understand the world around them.

First, education give us knowledge about different subjects like math, science, and history. This knowledge is useful for solving problems in daily life. For example, math help us calculate money when we go shopping.

Second, education teach us how to think critically. We learn to analyze information and make good decisions. This skill is important for success in work and personal life.

Also, education help us communicate better with other people. We learn to read, write, and speak properly. Good communication is necessary for building relationships and working with others.

In conclusion, education is the key to success and happiness. Everyone should have the opportunity to receive good education because it make our life better and help society progress.`,
    suggestions: [
      {
        suggestedBy: 'AI系統',
        originalContent: 'It help us to learn',
        correctedContent: 'It helps us to learn'
      },
      {
        suggestedBy: 'AI系統',
        originalContent: 'education give us knowledge',
        correctedContent: 'education gives us knowledge'
      },
      {
        suggestedBy: 'AI系統',
        originalContent: 'math help us calculate',
        correctedContent: 'math helps us calculate'
      }
    ],
    writingFeedback: {
      progress: 0.78,
      vocabulary: {
        score: 5,
        numVocabulary: 35,
        wordCount: 165,
        spellingErrors: 0,
        vocabularyLevel: 3,
        summary: '基礎字彙使用正確，建議增加更多進階詞彙'
      },
      grammar: {
        score: 6,
        form: 5,
        preposition: 7,
        punctuation: 8,
        summary: '文法需要改進，特別是主詞動詞一致性'
      },
      content: {
        score: 7,
        summary: '內容清晰，但論點不夠深入，建議增加更多細節和例子'
      },
      organization: {
        score: 6,
        summary: '文章結構基本清晰，但段落之間的連貫性需要加強'
      }
    },
    createdAt: '2024-03-05T11:45:00',
    createdBy: '張志強',
    updatedAt: '2024-03-20T13:25:00',
    updatedBy: '系統管理員'
  }
}

// 模擬 API 延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模擬 API 函數
export const essayDetailApi = {
  async getEssayDetail(id: string): Promise<EssayDetail> {
    await delay(800)
    const essay = mockEssayDetails[id]
    if (!essay) {
      throw new Error(`Essay with id ${id} not found`)
    }
    return { ...essay }
  },

  async updateEssayDetail(essayData: EssayDetail): Promise<EssayDetail> {
    await delay(1000)
    const updatedEssay = {
      ...essayData,
      updatedAt: new Date().toISOString(),
      updatedBy: '當前用戶'
    }
    mockEssayDetails[essayData.id] = updatedEssay
    return { ...updatedEssay }
  }
}

