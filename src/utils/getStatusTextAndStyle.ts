export const getStatusStyle = (status: number | string): string => {
  const numStatus = typeof status === 'string' ? parseInt(status, 10) : status;
  if (numStatus >= 200 && numStatus < 300) return 'text-green-700 bg-green-100';
  if (numStatus >= 300 && numStatus < 400) return 'text-blue-700 bg-blue-100';
  if (numStatus >= 400 && numStatus < 500) return 'text-yellow-700 bg-yellow-100';
  if (numStatus >= 500) return 'text-red-700 bg-red-100';
  return 'text-gray-700 bg-gray-100';
};

export const getStatusText = (status: number | string): string => {
  const numStatus = typeof status === 'string' ? parseInt(status, 10) : status;
  if (numStatus >= 200 && numStatus < 300) return 'OK';
  if (numStatus >= 300 && numStatus < 400) return 'Redirect';
  if (numStatus >= 400 && numStatus < 500) return 'Client Error';
  if (numStatus >= 500) return 'Server Error';
  return 'Unknown';
};
