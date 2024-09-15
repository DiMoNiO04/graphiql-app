import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = ({ size }: { size: number }) => {
  return <Loader2 className="animate-spin" style={{ width: size, height: size }} data-testid="loader" />;
};

export default Loader;
