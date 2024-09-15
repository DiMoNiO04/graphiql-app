import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import GraphQLRequestTabs from './../../../src/components/GraphQl/GraphQlRequestTabs';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/src/components/ui/Tabs', () => ({
  default: ({ onTabChange, tabs }: { onTabChange: (tab: string) => void; tabs: string[] }) => (
    <div>
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onTabChange(tab)}>
          {tab}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('../RestClient/RestClientHeaders', () => ({ default: () => <div>RestClientHeaders</div> }));
vi.mock('../QueryEditor/QueryEditor', () => ({ default: () => <div>QueryEditor</div> }));
vi.mock('../RestAndGraphQl/ClientParams', () => ({ default: () => <div>ClientParams</div> }));
vi.mock('../VariablesEditor/VariablesEditor', () => ({ default: () => <div>VariablesEditor</div> }));

describe('GraphQLRequestTabs', () => {
  const defaultProps = {
    query: 'query { test }',
    setQuery: vi.fn(),
    variables: '{ "test": "value" }',
    setVariables: vi.fn(),
    prettierText: vi.fn(),
    setUrl: vi.fn(),
    url: 'https://api.example.com/graphql',
  };

  it('renders without crashing', () => {
    render(<GraphQLRequestTabs {...defaultProps} />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(<GraphQLRequestTabs {...defaultProps} />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Query')).toBeInTheDocument();
    expect(screen.getByText('Params')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });
});
