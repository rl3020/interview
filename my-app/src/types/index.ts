// Example type definitions for the AI Phone Screen application
// TODO: Candidates should expand and modify these types based on their implementation

export interface Call {
  id: string
  phoneNumber: string
  candidateName?: string
  startTime: Date
  endTime?: Date
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  transcript?: Transcript
}

export interface Transcript {
  id: string
  callId: string
  messages: TranscriptMessage[]
  summary?: string
}

export interface TranscriptMessage {
  speaker: 'agent' | 'candidate'
  text: string
  timestamp: Date
}

export interface ScreeningQuestions {
  roleInterest?: string
  yearsOfExperience?: number
  techStack?: string[]
  workAuthorization?: string
  // TODO: Add more screening questions as needed
} 