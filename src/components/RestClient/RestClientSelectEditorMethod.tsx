import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { selectorEditorBodyMethods } from '../../constants/constants';
import React from 'react';

const RestClientSelectEditorMethod = ({ setBodyMethod }: { setBodyMethod: (method: string) => void }) => {
  return (
    <Select defaultValue="JSON" onValueChange={(value) => setBodyMethod(value)}>
      <SelectTrigger style={{ border: '1px solid #E4E4E7' }} className="w-[180px] text-sm font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectorEditorBodyMethods.map(({ method }, index) => (
            <SelectItem value={method} key={index} className="text-sm font-semibold">
              {method}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RestClientSelectEditorMethod;
