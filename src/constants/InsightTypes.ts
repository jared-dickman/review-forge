export interface Insight {
  id: string
  display: string
}

export const InsightTypes: Insight[] = [
  {
    id: 'summary',
    display: 'Summary'
  },
  {
    id: 'issues',
    display: 'Issue'
  },
  {
    id: 'testing',
    display: 'Testing'
  },
  {
    id: 'performance',
    display: 'Performance'
  },
  {
    id: 'security',
    display: 'Security'
  },
  {
    id: 'custom',
    display: 'Custom'
  },
] as const
