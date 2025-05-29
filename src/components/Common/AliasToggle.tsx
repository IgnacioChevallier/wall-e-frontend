import React from 'react';
import { useUserAliases } from '../../hooks/useUsers';
import Toggle from './Toggle';

interface AliasToggleProps {
  onSelect: (alias: string) => void;
  selectedAlias: string;
}

const AliasToggle: React.FC<AliasToggleProps> = ({ onSelect, selectedAlias }) => {
  const { aliases, loading, error } = useUserAliases();

  // Handler for when an alias is selected from the toggle
  const handleSelect = (alias: string) => {
    onSelect(alias);
  };

  return (
    <Toggle<string>
      items={aliases}
      onSelect={handleSelect}
      selectedItem={selectedAlias || undefined}
      getItemLabel={(alias) => alias}
      placeholder="Select recipient alias"
      loading={loading}
      error={error}
      loadingText="Loading aliases..."
      errorText="Failed to load aliases"
      emptyText="No aliases available"
    />
  );
};

export default AliasToggle; 