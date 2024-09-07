import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { selectorMethods } from '@/src/constants/constants';

const RestClientSelectMethod = ({ setMethod }: { setMethod: (method: string) => void }) => {
  return (
    <Select defaultValue="GET">
      <SelectTrigger style={{ border: '1px solid #E4E4E7' }} className="w-[180px] text-base font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectorMethods.map(({ method }, index) => (
            <SelectItem value={method} key={index} className="text-base font-semibold">
              {method}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RestClientSelectMethod;
