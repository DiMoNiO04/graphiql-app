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
import { selectorResponseParameters } from '@/src/constants/constants';
const RestClientSelectResponseParameters = ({
  setResponseParameters,
}: {
  setResponseParameters: (responseParameters: string) => void;
}) => {
  return (
    <Select onValueChange={(value) => setResponseParameters(value)} defaultValue="Body">
      <SelectTrigger style={{ border: '1px solid #E4E4E7' }} className="w-[180px] text-sm font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectorResponseParameters.map(({ method }, index) => (
            <SelectItem value={method} key={index} className="text-sm font-semibold">
              {method}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RestClientSelectResponseParameters;
