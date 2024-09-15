import React from 'react';
import { Input } from '../ui/input';

const GraphiQLRequestHeader = ({
  url,
  setUrl,
  sdlUrl,
  setSdlUrl,
}: {
  setUrl: (url: string) => void;
  url: string;
  setSdlUrl: (sdlUrl: string) => void;
  sdlUrl: string;
}) => {
  const handleEndpointUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndpointUrl = e.target.value;
    setUrl(newEndpointUrl);
    setSdlUrl(`${newEndpointUrl}?sdl`);
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">GraphiQL Client</h1>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-col gap-2">
          <p className="text-black/90 text-base">Enter your GraphQL endpoint URL</p>
          <Input
            type="text"
            placeholder="Enter Api endpoint URL"
            className="w-full"
            value={url}
            onChange={handleEndpointUrlChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-black/90 text-base">Enter your SDL endpoint URL</p>
          <Input
            type="text"
            placeholder="Enter SDL endpoint URL"
            className="w-full"
            value={sdlUrl}
            onChange={(e) => setSdlUrl(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default GraphiQLRequestHeader;
