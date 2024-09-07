'use client';
import React, { useState } from 'react';
import RestClientRequestHeader from '@/src/components/RestClient/RestClientRequestHeader';
import RestClientTabs from '@/src/components/RestClient/RestClientTabs';
const RestClient = () => {
  return (
    <div className="display-flex justify-center flex-col py-16 px-10 max-w-[1200px] mx-auto text-sm font-medium">
      <div className="flex flex-col gap-10">
        <RestClientRequestHeader />
        <RestClientTabs />
      </div>
    </div>
  );
};

export default RestClient;
