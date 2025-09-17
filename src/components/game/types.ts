/**
 * Thwordle 游戏类型定义
 * 包含所有游戏状态、主题、动画和交互相关的类型
 */

// =========================
// 基础数据类型
// =========================

/**
 * 单词长度类型，支持 4-7 个字母的单词
 */
export type WordLength = 4 | 5 | 6 | 7;

/**
 * 游戏回合数，固定为 6 次机会
 */
export type GameRounds = 6;

/**
 * 字母索引类型，用于标识字母在单词中的位置
 */
export type LetterIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 回合索引类型，用于标识当前是第几次尝试
 */
export type RoundIndex = 0 | 1 | 2 | 3 | 4 | 5;

// =========================
// 瓷砖状态类型
// =========================

/**
 * 单个瓷砖（字母格子）的状态
 */
export type TileState =
  | 'empty' // 空白状态
  | 'filled' // 已填充但未评估
  | 'correct' // 正确位置的正确字母
  | 'present' // 包含在单词中但位置错误的字母
  | 'absent'; // 不包含在单词中的字母

/**
 * 瓷砖动画状态
 */
export type TileAnimationState =
  | 'idle' // 无动画
  | 'pop' // 弹出动画（输入字母时）
  | 'flip' // 翻转动画（评估结果时）
  | 'bounce' // 弹跳动画（游戏胜利时）
  | 'shake' // 摇摆动画（无效单词时）
  | 'pulse'; // 脉冲动画（提示时）

/**
 * 单个瓷砖的完整定义
 */
export interface GameTile {
  /** 瓷砖显示的字母 */
  letter: string;
  /** 瓷砖的游戏状态 */
  state: TileState;
  /** 瓷砖的动画状态 */
  animationState: TileAnimationState;
  /** 动画延迟（毫秒），用于错开动画效果 */
  animationDelay: number;
  /** 是否正在动画中 */
  isAnimating: boolean;
}

// =========================
// 游戏板相关类型
// =========================

/**
 * 游戏行，包含一次猜测的所有瓷砖
 */
export type GameRow = GameTile[];

/**
 * 完整的游戏板，包含所有行
 */
export type GameBoard = GameRow[];

/**
 * 游戏板尺寸配置
 */
export interface BoardDimensions {
  /** 单词长度（列数） */
  wordLength: WordLength;
  /** 尝试次数（行数） */
  maxGuesses: GameRounds;
}

// =========================
// 游戏状态类型
// =========================

/**
 * 游戏进行状态
 */
export type GameStatus =
  | 'playing' // 游戏进行中
  | 'won' // 游戏胜利
  | 'lost' // 游戏失败
  | 'loading' // 加载中
  | 'error'; // 错误状态

/**
 * 游戏难度等级
 */
export type DifficultyLevel =
  | 'easy' // 简单（4字母）
  | 'normal' // 普通（5字母）
  | 'hard' // 困难（6字母）
  | 'expert'; // 专家（7字母）

/**
 * 游戏模式
 */
export type GameMode =
  | 'daily' // 每日挑战
  | 'practice' // 练习模式
  | 'themed' // 主题模式
  | 'custom'; // 自定义模式

// =========================
// 主题系统类型
// =========================

/**
 * 游戏主题标识符
 */
export type ThemeId =
  | 'default' // 默认主题
  | 'harry-potter' // 哈利波特主题
  | 'lord-of-rings' // 指环王主题
  | 'greek-mythology' // 希腊神话主题
  | 'star-wars' // 星球大战主题
  | 'disney' // 迪士尼主题
  | 'marvel' // 漫威主题
  | 'pokemon' // 宝可梦主题
  | 'anime' // 动漫主题
  | 'food' // 美食主题
  | 'animals' // 动物主题
  | 'countries' // 国家主题
  | 'science' // 科学主题
  | 'history' // 历史主题
  | 'music' // 音乐主题
  | 'sports'; // 体育主题

/**
 * 主题配置信息
 */
export interface GameTheme {
  /** 主题唯一标识符 */
  id: ThemeId;
  /** 主题显示名称 */
  name: string;
  /** 主题描述 */
  description: string;
  /** 主题图标 */
  icon: string;
  /** 主题颜色配置 */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    correct: string;
    present: string;
    absent: string;
  };
  /** 主题特殊效果 */
  effects?: {
    particles?: boolean;
    animations?: boolean;
    sounds?: boolean;
  };
  /** 单词数据源 */
  wordList: string[];
  /** 是否为付费主题 */
  isPremium: boolean;
  /** 解锁条件 */
  unlockCondition?: {
    type: 'games_played' | 'games_won' | 'streak' | 'purchase';
    value: number;
  };
}

// =========================
// 虚拟键盘类型
// =========================

/**
 * 键盘按键类型
 */
export type KeyboardKeyType =
  | 'letter' // 字母键
  | 'enter' // 确认键
  | 'backspace'; // 删除键

/**
 * 键盘按键状态
 */
export type KeyboardKeyState =
  | 'default' // 默认状态
  | 'correct' // 正确（绿色）
  | 'present' // 包含（黄色）
  | 'absent' // 不包含（灰色）
  | 'disabled'; // 禁用状态

/**
 * 键盘按键定义
 */
export interface KeyboardKey {
  /** 按键显示文本 */
  key: string;
  /** 按键类型 */
  type: KeyboardKeyType;
  /** 按键状态 */
  state: KeyboardKeyState;
  /** 是否禁用 */
  disabled: boolean;
  /** 按键宽度倍数 */
  width?: number;
}

/**
 * 键盘布局行
 */
export type KeyboardRow = KeyboardKey[];

/**
 * 完整键盘布局
 */
export type KeyboardLayout = KeyboardRow[];

// =========================
// 用户输入类型
// =========================

/**
 * 用户输入事件类型
 */
export type UserInputType =
  | 'key_press' // 按键输入
  | 'virtual_key' // 虚拟键盘输入
  | 'touch' // 触摸输入
  | 'mouse_click'; // 鼠标点击

/**
 * 用户输入事件
 */
export interface UserInputEvent {
  /** 输入类型 */
  type: UserInputType;
  /** 输入的字符或动作 */
  value: string;
  /** 时间戳 */
  timestamp: number;
  /** 是否为有效输入 */
  isValid: boolean;
}

// =========================
// 游戏统计类型
// =========================

/**
 * 单次游戏结果
 */
export interface GameResult {
  /** 游戏状态 */
  status: GameStatus;
  /** 使用的猜测次数 */
  guessCount: number;
  /** 游戏用时（秒） */
  duration: number;
  /** 目标单词 */
  targetWord: string;
  /** 使用的主题 */
  theme: ThemeId;
  /** 游戏模式 */
  mode: GameMode;
  /** 难度等级 */
  difficulty: DifficultyLevel;
  /** 完成时间戳 */
  completedAt: Date;
}

/**
 * 游戏统计数据
 */
export interface GameStatistics {
  /** 总游戏次数 */
  totalGames: number;
  /** 胜利次数 */
  totalWins: number;
  /** 胜率百分比 */
  winPercentage: number;
  /** 当前连胜次数 */
  currentStreak: number;
  /** 最长连胜次数 */
  maxStreak: number;
  /** 平均猜测次数 */
  averageGuesses: number;
  /** 各次数猜测的分布 */
  guessDistribution: Record<number, number>;
  /** 最快完成时间 */
  fastestTime: number;
  /** 平均完成时间 */
  averageTime: number;
  /** 最后游戏时间 */
  lastPlayedAt?: Date;
  /** 按主题分类的统计 */
  themeStats: Record<ThemeId, Partial<GameStatistics>>;
  /** 按难度分类的统计 */
  difficultyStats: Record<DifficultyLevel, Partial<GameStatistics>>;
}

// =========================
// 每日挑战类型
// =========================

/**
 * 每日挑战信息
 */
export interface DailyChallenge {
  /** 挑战日期 */
  date: string;
  /** 挑战编号 */
  puzzleNumber: number;
  /** 目标单词 */
  targetWord: string;
  /** 挑战主题 */
  theme: ThemeId;
  /** 难度等级 */
  difficulty: DifficultyLevel;
  /** 是否已完成 */
  isCompleted: boolean;
  /** 完成结果 */
  result?: GameResult;
  /** 挑战过期时间 */
  expiresAt: Date;
}

// =========================
// 游戏配置类型
// =========================

/**
 * 游戏设置
 */
export interface GameSettings {
  /** 是否启用音效 */
  soundEnabled: boolean;
  /** 是否启用振动反馈 */
  hapticEnabled: boolean;
  /** 是否启用暗黑模式 */
  darkMode: boolean;
  /** 是否启用高对比度模式 */
  highContrast: boolean;
  /** 是否启用色盲辅助 */
  colorBlindAssist: boolean;
  /** 是否启用动画 */
  animationsEnabled: boolean;
  /** 动画速度倍数 */
  animationSpeed: number;
  /** 键盘布局偏好 */
  keyboardLayout: 'qwerty' | 'alphabetical';
  /** 是否显示键盘 */
  showKeyboard: boolean;
  /** 是否启用提示 */
  hintsEnabled: boolean;
  /** 语言设置 */
  language: 'en' | 'zh' | 'es' | 'fr' | 'de';
  /** 自动保存游戏 */
  autoSave: boolean;
}

/**
 * 游戏难度配置
 */
export interface DifficultyConfig {
  /** 难度等级 */
  level: DifficultyLevel;
  /** 单词长度 */
  wordLength: WordLength;
  /** 最大猜测次数 */
  maxGuesses: GameRounds;
  /** 是否启用提示 */
  hintsAllowed: boolean;
  /** 提示次数限制 */
  maxHints: number;
  /** 时间限制（秒，0表示无限制） */
  timeLimit: number;
}

// =========================
// 游戏状态管理类型
// =========================

/**
 * 当前游戏状态
 */
export interface GameState {
  /** 游戏唯一标识符 */
  gameId: string;
  /** 游戏板状态 */
  board: GameBoard;
  /** 当前猜测行索引 */
  currentRow: RoundIndex;
  /** 当前猜测列索引 */
  currentCol: LetterIndex;
  /** 游戏状态 */
  status: GameStatus;
  /** 目标单词 */
  targetWord: string;
  /** 当前猜测的单词 */
  currentGuess: string;
  /** 已猜测的单词列表 */
  guesses: string[];
  /** 键盘状态 */
  keyboard: KeyboardLayout;
  /** 使用的主题 */
  theme: ThemeId;
  /** 游戏模式 */
  mode: GameMode;
  /** 难度配置 */
  difficulty: DifficultyConfig;
  /** 开始时间 */
  startTime: Date;
  /** 结束时间 */
  endTime?: Date;
  /** 游戏用时（秒） */
  duration: number;
  /** 是否暂停 */
  isPaused: boolean;
  /** 错误信息 */
  error?: string;
  /** 提示使用次数 */
  hintsUsed: number;
  /** 游戏设置 */
  settings: GameSettings;
}

// =========================
// 动画系统类型
// =========================

/**
 * 动画类型
 */
export type AnimationType =
  | 'tile_flip' // 瓷砖翻转
  | 'tile_pop' // 瓷砖弹出
  | 'tile_bounce' // 瓷砖弹跳
  | 'row_shake' // 行摇摆
  | 'board_celebration' // 游戏板庆祝
  | 'keyboard_press' // 键盘按键
  | 'theme_transition' // 主题切换
  | 'modal_slide' // 模态框滑动
  | 'loading_spinner'; // 加载旋转

/**
 * 动画配置
 */
export interface AnimationConfig {
  /** 动画类型 */
  type: AnimationType;
  /** 动画持续时间（毫秒） */
  duration: number;
  /** 动画延迟（毫秒） */
  delay: number;
  /** 动画缓动函数 */
  easing: string;
  /** 是否循环播放 */
  loop: boolean;
  /** 动画方向 */
  direction: 'normal' | 'reverse' | 'alternate';
}

// =========================
// 事件系统类型
// =========================

/**
 * 游戏事件类型
 */
export type GameEventType =
  | 'game_start' // 游戏开始
  | 'game_end' // 游戏结束
  | 'guess_submit' // 提交猜测
  | 'word_complete' // 完成单词
  | 'key_press' // 按键事件
  | 'theme_change' // 主题切换
  | 'settings_change' // 设置改变
  | 'hint_used' // 使用提示
  | 'achievement_unlock' // 成就解锁
  | 'error_occurred'; // 错误发生

/**
 * 游戏事件数据
 */
export interface GameEvent {
  /** 事件类型 */
  type: GameEventType;
  /** 事件数据 */
  data: Record<string, unknown>;
  /** 事件时间戳 */
  timestamp: number;
  /** 事件来源 */
  source: string;
}

/**
 * 事件监听器函数
 */
export type GameEventListener = (event: GameEvent) => void;

// =========================
// 错误处理类型
// =========================

/**
 * 游戏错误类型
 */
export type GameErrorType =
  | 'invalid_word' // 无效单词
  | 'word_too_short' // 单词太短
  | 'word_too_long' // 单词太长
  | 'word_not_found' // 单词未找到
  | 'game_not_active' // 游戏未激活
  | 'network_error' // 网络错误
  | 'storage_error' // 存储错误
  | 'theme_load_error' // 主题加载错误
  | 'invalid_input' // 无效输入
  | 'timeout_error'; // 超时错误

/**
 * 游戏错误信息
 */
export interface GameError {
  /** 错误类型 */
  type: GameErrorType;
  /** 错误消息 */
  message: string;
  /** 错误代码 */
  code?: string;
  /** 错误详情 */
  details?: Record<string, unknown>;
  /** 错误时间戳 */
  timestamp: Date;
  /** 是否可恢复 */
  recoverable: boolean;
}

// =========================
// 成就系统类型
// =========================

/**
 * 成就类型
 */
export type AchievementType =
  | 'first_win' // 首次胜利
  | 'streak_master' // 连胜大师
  | 'speed_demon' // 速度恶魔
  | 'theme_collector' // 主题收集者
  | 'daily_warrior' // 每日战士
  | 'perfect_game' // 完美游戏
  | 'comeback_king' // 逆转之王
  | 'explorer' // 探索者
  | 'dedication' // 奉献精神
  | 'master_solver'; // 解谜大师

/**
 * 成就定义
 */
export interface Achievement {
  /** 成就唯一标识符 */
  id: string;
  /** 成就类型 */
  type: AchievementType;
  /** 成就名称 */
  name: string;
  /** 成就描述 */
  description: string;
  /** 成就图标 */
  icon: string;
  /** 成就条件 */
  condition: {
    type: string;
    target: number;
    current: number;
  };
  /** 是否已解锁 */
  unlocked: boolean;
  /** 解锁时间 */
  unlockedAt?: Date;
  /** 成就稀有度 */
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  /** 奖励积分 */
  points: number;
}

// =========================
// 工具函数类型
// =========================

/**
 * 单词验证结果
 */
export interface WordValidation {
  /** 是否有效 */
  isValid: boolean;
  /** 错误类型（如果无效） */
  error?: GameErrorType;
  /** 错误消息 */
  message?: string;
}

/**
 * 单词评估结果
 */
export interface WordEvaluation {
  /** 每个字母的状态 */
  letterStates: TileState[];
  /** 是否完全正确 */
  isCorrect: boolean;
  /** 正确位置数量 */
  correctCount: number;
  /** 包含位置数量 */
  presentCount: number;
}

// =========================
// API 相关类型
// =========================

/**
 * API 响应基础类型
 */
export interface ApiResponse<T = unknown> {
  /** 是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: T;
  /** 错误信息 */
  error?: string;
  /** 错误代码 */
  code?: string;
  /** 响应时间戳 */
  timestamp: number;
}

/**
 * 获取每日挑战的响应类型
 */
export type GetDailyChallengeResponse = ApiResponse<DailyChallenge>;

/**
 * 获取用户统计的响应类型
 */
export type GetUserStatsResponse = ApiResponse<GameStatistics>;

/**
 * 提交游戏结果的请求类型
 */
export interface SubmitGameResultRequest {
  /** 游戏结果 */
  result: GameResult;
  /** 游戏状态 */
  gameState: GameState;
}

/**
 * 提交游戏结果的响应类型
 */
export type SubmitGameResultResponse = ApiResponse<{
  /** 更新的统计数据 */
  statistics: GameStatistics;
  /** 新解锁的成就 */
  newAchievements: Achievement[];
}>;

// =========================
// 所有类型都已在上面使用 export 关键字导出
// =========================
