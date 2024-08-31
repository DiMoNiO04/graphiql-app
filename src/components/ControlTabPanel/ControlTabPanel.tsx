import { TabPanelProps } from '@/src/types/tabPanelTypes';
import { Box } from '@mui/material';

const ControlTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', width: 700 }}>{children}</Box>}
    </div>
  );
};

export default ControlTabPanel;
