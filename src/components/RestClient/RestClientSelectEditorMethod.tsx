import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { selectorEditorBodyMethods } from '@/src/constants/constants';

const RestClientSelectEditorMethod = () => {
  return (
    <Select defaultValue="JSON">
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
