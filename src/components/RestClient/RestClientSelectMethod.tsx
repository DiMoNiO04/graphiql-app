import React from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { selectorMethods } from '../../constants/constants';

const RestClientSelectMethod = ({ setMethod, method }: { setMethod: (method: string) => void; method: string }) => {
  return (
    <Select value={method ? method : 'GET'} onValueChange={(value) => setMethod(value as string)}>
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
