import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { selectorResponseParameters } from '../../constants/constants';
const RestClientSelectResponseParameters = ({
  setResponseParameters,
  responseParameters,
}: {
  setResponseParameters: (responseParameters: string) => void;
  responseParameters: string;
}) => {
  return (
    <Select onValueChange={(value) => setResponseParameters(value)} value={responseParameters}>
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
